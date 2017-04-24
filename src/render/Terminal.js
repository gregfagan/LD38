import React from 'react'
import { Wrapper, CacheMeasurer, CanvasContext } from 'typesettable'

import * as dimensions from './dimensions'
import CanvasRenderer from './CanvasRenderer'

const blinkRate = 750
const validInput = new Set('abcdefghijklmnopqrstuvwxyz1234567890 ')

function createWrapper(ctx) {
    const context = new CanvasContext(ctx, dimensions.lineHeight, { font: dimensions.font })
    const measurer = new CacheMeasurer(context)
    const wrapper = new Wrapper()
    return { measurer, wrapper }
}

export default class Terminal extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      input: '',
      lookBehind: 0,
      caret: { on: true, when: props.now }
    }

    // we need a canvas context to create our wrapper, but we only need to
    // create it once and it can be shared across all of the sectors
    this._wrapper = null
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

  componentDidMount() {
    this.keylogger = document.addEventListener('keydown', e => {
      // console.log(`pressed ${e.key}`)

      const { input, lookBehind } = this.state

      if (validInput.has(e.key.toLowerCase())) {
        this.setState({ input: input + e.key })
      } else if (e.key === 'Backspace') {
        this.setState({ input: input.substring(0, input.length - 1) })
      } else if (e.key === 'Enter') {
        console.log(`dispatch ${input}`)
        this.setState({ input: '', lookBehind: 0 })
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const adjustment = (e.key === 'ArrowDown' ? -1 : 1)
        const maxLookBehind = this._wrappedLines.length - dimensions.terminal.outputHeight
        this.setState({
          lookBehind: Math.min(maxLookBehind, Math.max(0, lookBehind + adjustment))
        })
      }
    })
  }

  componentWillUnmount() {
    doument.removeEventListener(this.keylogger)
  }

  wrap(text) {
    if (!this._wrapper) return
    const { wrapper, measurer } = this._wrapper
    const wrappedText = wrapper.wrap(
      text,
      measurer,
      dimensions.terminal.width * dimensions.charWidth
    ).wrappedText
    this._wrappedLines = wrappedText.split('\n')
  }

  render() {
    const {
      text='',
      textColor='#44aa44',
      backgroundColor='#112211',
      now,
      ...props
    } = this.props

    const { input, caret, lookBehind } = this.state

    return (
      <CanvasRenderer onRender={canvas => {
        const { width, height } = canvas
        const ctx = canvas.getContext('2d')

        if (!this._wrapper) {
          this._wrapper = createWrapper(ctx)
          this.wrap(text)
        }

        const startOnLine = Math.max(0, this._wrappedLines.length - dimensions.terminal.outputHeight - lookBehind)
        const stopOnLine = Math.max(dimensions.terminal.outputHeight, this._wrappedLines.length - lookBehind)
        const visibleLines = this._wrappedLines.slice(startOnLine, stopOnLine)

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
          (dimensions.terminal.height + 0.2) * dimensions.lineHeight
        )

        ctx.font = dimensions.font
        ctx.fillStyle = textColor
        let j = 1
        for (let line of visibleLines) {
          let i = 0
          for (let c of line) {
            ctx.fillText(c, i * dimensions.charWidth, j * dimensions.lineHeight)
            i++
          }
          j++
        }

        const inputLine = input + (caret.on ? '■' : '')
        ctx.translate(0, (dimensions.terminal.height - 1) * dimensions.lineHeight)
        let i = 0
        for (let c of inputLine) {
          ctx.fillText(c, i * dimensions.charWidth, dimensions.lineHeight)
          i++
        }
        ctx.restore()

      }} {...props} />
    )
  }
}
