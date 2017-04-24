import React from 'react'
import React3 from 'react-three-renderer'
import * as three from 'three'
import { easeElasticOut } from 'd3-ease'

import { rotations, updateUVs } from './dodecahedron'
import { textureSize } from './dimensions'
import Terminal from './Terminal'

function createCanvas(resolution) {
  const canvas = document.createElement('canvas')
  canvas.width = resolution
  canvas.height = resolution
  return canvas
}

const rotateDuration = 1500
const ease = easeElasticOut.period(1.5)

export default class World extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.cameraPosition = new three.Vector3(0, 0, 5)
    this.lightPosition = new three.Vector3(-5, 5, 15)
    this.lightLookAt = new three.Vector3(0, 0, 0)

    this.canvases = [...Array(12).keys()].map(() => createCanvas(textureSize))
    this.textures = this.canvases.map(c => new three.CanvasTexture(c))
    this.materials = this.textures.map(t => new three.MeshPhongMaterial({
      map: t,
      shading: three.FlatShading,
    }))

    const now = performance.now()
    this.state = {
      now,
      lastSector: { id: 0, when: now }
    }

    this.animate = this.animate.bind(this)
    this.handleCanvasRender = this.handleCanvasRender.bind(this)

    window.addEventListener('resize', () => this.forceUpdate())
  }

  componentDidMount() {
    const geometry = new three.DodecahedronGeometry()
    updateUVs(geometry)

    const mesh = new three.Mesh(geometry, this.materials)
    this.mount.add(mesh)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentSector !== this.props.currentSector) {
      this.setState({
        lastSector: { id: this.props.currentSector, when: performance.now() }
      })
    }
  }

  animate() {
    this.setState({ now: performance.now() })
  }

  handleCanvasRender(index) {
    this.textures[index].needsUpdate = true
  }

  render() {
    const width = window.innerWidth
    const height = window.innerHeight

    const {
      currentSector = 0,
      terminalText = '',
      dispatch,
      children
    } = this.props
    const { now, lastSector } = this.state

    const timeSinceSectorChange = now - lastSector.when
    const t = Math.min(1, timeSinceSectorChange / rotateDuration)
    const rotation = new three.Quaternion()
    three.Quaternion.slerp(
      rotations[lastSector.id],
      rotations[currentSector],
      rotation,
      ease(t)
    )

    return (
      <React3 mainCamera="camera"
        width={width}
        height={height}
        onAnimate={this.animate}
      >
        <scene>
          <group quaternion={rotation.conjugate()}>
            <perspectiveCamera name="camera"
              fov={20}
              aspect={width / height}
              near={0.1}
              far={1000}
              position={this.cameraPosition}
            />
          </group>
          <ambientLight intensity={0.75} />
          <directionalLight position={this.lightPosition}
            lookAt={this.lightLookAt}
          />
          <group ref={(g) => { this.mount = g }} />
          { React.Children.map(children, (child, i) => (
            React.cloneElement(child, {
              id: i,
              active: i === currentSector,
              canvas: this.canvases[i],
              didRender: this.handleCanvasRender
            })
          ))}
          <Terminal text={terminalText}
            dispatch={dispatch}
            now={t >= 1 ? now : lastSector.when} // don't animate while rotating
            canvas={this.canvases[currentSector]}
            id={currentSector}
            didRender={this.handleCanvasRender}
          />
        </scene>
      </React3>
    )
  }
}
