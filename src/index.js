import React from 'react'
import ReactDOM from 'react-dom'

import World from './World'
import CanvasTextRenderer from './CanvasTextRenderer'

const text = [...Array(12).keys()].map(index =>
  Array(1000).fill(index < 10 ? '' + index : index === 10 ? 'a' : 'b').join('')
)

function time() {
  const d = new Date()
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}

class TextureUpdateTest extends React.Component {
  constructor() {
    super()
    this.state = { now: time() }
    window.setInterval(
      () => { this.setState({ now: time() }) },
      1000
    )
  }

  render() {
    return (
      <World>
         { text.map((text, i) => (
           <CanvasTextRenderer key={i} text={
             i === 0
              ? `${text} ${this.state.now}`
              : text
           }/>
         ))}
      </World>
    )
  }
}

ReactDOM.render(
  <TextureUpdateTest />,
  document.getElementById('app')
)
