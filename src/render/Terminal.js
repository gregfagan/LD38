import React from 'react'

import * as dimensions from './dimensions'
import CanvasRenderer from './CanvasRenderer'

const blinkRate = 750
const validInput = new Set('abcdefghijklmnopqrstuvwxyz1234567890 ')

export default class Terminal extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      input: '',
      lookBehind: 0,
      caret: { on: true, when: props.now }
    }

    this.wrap(props.text)
  }

  componentDidMount() {
    this.keylogger = document.addEventListener('keydown', (e) => {
      // console.log(`pressed ${e.key}`)

      const { dispatch } = this.props
      const { input, lookBehind } = this.state

      if (validInput.has(e.key.toLowerCase())) {
        this.setState({ input: input + e.key })
      } else if (e.key === 'Backspace') {
        this.setState({ input: input.substring(0, input.length - 1) })
      } else if (e.key === 'Enter') {
        dispatch(input)
        this.setState({ input: '', lookBehind: 0 })
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const adjustment = (e.key === 'ArrowDown' ? -1 : 1)
        const maxLookBehind = this.wrappedLines.length - dimensions.terminal.outputHeight
        this.setState({
          lookBehind: Math.min(maxLookBehind, Math.max(0, lookBehind + adjustment))
        })
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({ input: '', lookBehind: 0 })
    }

    if (nextProps.now > (this.state.caret.when + blinkRate)) {
      this.setState({
        caret: { on: !this.state.caret.on, when: nextProps.now }
      })
    }

    if (nextProps.text !== this.props.text) {
      this.wrap(nextProps.text)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.id !== this.props.id
      || nextProps.text !== this.props.text
      || nextProps.now > (this.state.caret.when + blinkRate)
      || nextState.input !== this.state.input
      || nextState.lookBehind !== this.state.lookBehind
    )
  }

  componentWillUnmount() {
    document.removeEventListener(this.keylogger)
  }

  wrap(text) {
    this.wrappedLines = text.split(/( |\n)/).reduce((result, token) => {
      // Insert new lines when explictly called for
      if (token === '\n') return ['', ...result]

      const [last, ...rest] = result

      // Don't insert whitespace at the beginning of a line
      if (last.length === 0 && token === ' ') return result

      return (last.length + token.length <= dimensions.terminal.width)
        ? [last + token, ...rest]
        : [token, ...result]
    }, ['']).reverse()
  }

  render() {
    const {
      textColor = '#44aa44',
      backgroundColor = '#112211',
      now,
      ...props
    } = this.props

    const { input, caret, lookBehind } = this.state

    return (
      <CanvasRenderer onRender={(canvas) => {
        const ctx = canvas.getContext('2d')

        const startOnLine = Math.max(0, this.wrappedLines.length - dimensions.terminal.outputHeight - lookBehind)
        const stopOnLine = Math.max(dimensions.terminal.outputHeight, this.wrappedLines.length - lookBehind)
        const visibleLines = this.wrappedLines.slice(startOnLine, stopOnLine)

        ctx.save()
        ctx.translate(
          dimensions.terminal.x * dimensions.charWidth,
          dimensions.terminal.y * dimensions.lineHeight
        )
        ctx.fillStyle = backgroundColor

        // Background, with a little extra at the bottom to cover descenders
        ctx.fillRect(
          0, 0,
          dimensions.terminal.width * dimensions.charWidth,
          ((visibleLines.length + 2) + 0.2) * dimensions.lineHeight
        )

        ctx.font = dimensions.font
        ctx.fillStyle = textColor
        visibleLines.forEach((line, j) => {
          for (let i = 0; i < line.length; i += 1) {
            ctx.fillText(
              line.charAt(i),
              i * dimensions.charWidth,
              (j + 1) * dimensions.lineHeight
            )
          }
        })

        const inputLine = input + (caret.on ? '■' : '')
        ctx.translate(0, (visibleLines.length + 1) * dimensions.lineHeight)

        for (let i = 0; i < inputLine.length; i += 1) {
          ctx.fillText(inputLine.charAt(i), i * dimensions.charWidth, dimensions.lineHeight)
        }
        ctx.restore()
      }} {...props} />
    )
  }
}
