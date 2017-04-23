import React, { cloneElement } from 'react'

const Flex = ({style, ...rest}) => (
  <div style={{ ...style, display: 'flex' }} {...rest} />
)

const controlsContainerStyle = {
  position: 'fixed',
  top: 0,
  background: 'white',
  padding: 10,
  fontFamily: 'Inconsolata, monospace',
  flexDirection: 'column'
}

const RotationSlider = ({name, value, onChange}) => (
  <Flex>
    <span>{name}</span>
    <input
      type="range"
      style={{ margin: '0px 5px' }}
      min="-1" max="1" step="0.5"
      name={name} value={value} onChange={onChange} />
    <span>{value}</span>
  </Flex>
)

export default class RotationControls extends React.Component {
  constructor() {
    super()
    this.state = {
      x_dihedral: 0.5,
      y_dihedral: 0,
      z_dihedral: 0,
      x_complement: 0,
      y_complement: 0,
      z_complement: 0
    }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: +e.target.value
    })
  }

  render() {
    return(
      <Flex>
        <Flex style={controlsContainerStyle}>
          <RotationSlider name="x_dihedral" value={this.state.x_dihedral} onChange={this.handleInput} />
          <RotationSlider name="y_dihedral" value={this.state.y_dihedral} onChange={this.handleInput} />
          <RotationSlider name="z_dihedral" value={this.state.z_dihedral} onChange={this.handleInput} />
          <RotationSlider name="x_complement" value={this.state.x_complement} onChange={this.handleInput} />
          <RotationSlider name="y_complement" value={this.state.y_complement} onChange={this.handleInput} />
          <RotationSlider name="z_complement" value={this.state.z_complement} onChange={this.handleInput} />
        </Flex>

        { cloneElement(this.props.children, this.state) }
      </Flex>
    )
  }
}
