import React from 'react'
import ReactDOM from 'react-dom'
import WebFont from 'webfontloader'

import World from './render/World'
import Sector from './render/Sector'

const sectors = [...Array(12).keys()].map(index => ({
  id: index,
  text: Array(32 * 64).fill(index < 10 ? `${index}` : index === 10 ? 'a' : 'b').join('')
}))

const terminalText = 'A description of a sector.'

class SectorSwitcher extends React.Component {
  constructor() {
    super()
    this.state = { surface: 0 }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.setState(previousState => ({
          surface: ((previousState.surface - 1) + 12) % 12
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
         { sectors.map(s => <Sector key={s.id} text={s.text} />)}
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
