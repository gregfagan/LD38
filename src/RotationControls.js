import React, { cloneElement } from 'react'

const controlsContainerStyle = {
  position: 'fixed',
  top: 0,
  background: 'white',
  padding: 10
}

export default class RotationControls extends React.Component {
  constructor() {
    super()
    this.state = { x: 0, y: 0, z: 0 }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(e) {
    this.setState({
      x: +e.target.value
    })
  }

  render() {
    return(
      <div>
        <div style={controlsContainerStyle}>
          <input type="range"
            min="0" max="1" step="0.1"
            value={this.state.x} onChange={this.handleInput}
         />
        </div>

        { cloneElement(this.props.children, this.state) }
      </div>
    )
  }
}
