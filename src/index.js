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
    this.state = {
      surface: 0,
      now: time()
    }
    window.setInterval(
      () => { this.setState({ now: time() }) },
      1000
    )

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') {
        this.setState(previousState => ({
          surface: (previousState.surface - 1 + 12) % 12
        }))
      }

      if (e.key === 'ArrowRight') {
        this.setState(previousState => ({
          surface: (previousState.surface + 1) % 12
        }))
      }
    })
  }



  render() {
    return (
      <World currentSector={this.state.surface}>
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
