import React from 'react'
import ReactDOM from 'react-dom'
import WebFont from 'webfontloader'

import World from './render/World'
import Sector from './render/Sector'

const backgroundText = [...Array(12).keys()].map(index =>
  Array(32 * 64).fill(index < 10 ? '' + index : index === 10 ? 'a' : 'b').join('')
)

const terminalText = "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness."

class SectorSwitcher extends React.Component {
  constructor() {
    super()
    this.state = { surface: 0 }

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
      <World currentSector={this.state.surface} terminalText={terminalText}>
         { backgroundText.map((text, i) => (
           <Sector key={i} text={text} />
         ))}
      </World>
    )
  }
}

function render() {
  ReactDOM.render(
    <SectorSwitcher />,
    document.getElementById('app')
  )
}

// This thing doesn't seem to do what it is supposed to do
WebFont.load({
  classes: false,
  google: { families: ['Inconsolata'] },
  // Set a timeout to render because this thing doesn't seem to work
  active: () => { setTimeout(render, 500) }
})
