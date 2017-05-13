import React from 'react'
import CanvasRenderer from './CanvasRenderer'

import * as dimensions from './dimensions'

export default class Sector extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.active !== this.props.active ||
      nextProps.text !== this.props.text ||
      nextProps.backgroundColor !== this.props.backgroundColor ||
      nextProps.backgroundTextColor !== this.props.backgroundTextColor
    )
  }

  render() {
    const {
      text = '',
      backgroundTextColor = '#115511',
      backgroundColor = '#112211',
      ...props
    } = this.props
    return (
      <CanvasRenderer onRender={(canvas) => {
        const { width, height } = canvas
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, width, height)

        const charsPerLine = width / dimensions.charWidth

        ctx.font = dimensions.font
        ctx.fillStyle = backgroundTextColor
        for (let i = 0; i < text.length; i += 1) {
          const x = (i % charsPerLine) * dimensions.charWidth
          const y = (1 + Math.floor(i / charsPerLine)) * dimensions.lineHeight
          ctx.fillText(text.charAt(i), x, y)
        }
      }} {...props} />
    )
  }
}
