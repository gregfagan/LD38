import React from 'react'
import ReactDOM from 'react-dom'
import React3 from 'react-three-renderer'
import {
  Vector3
} from 'three'

export default class World extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.cameraPosition = new Vector3(0, 0, 10)
  }

  render() {
    const width = window.innerWidth
    const height = window.innerHeight

    return (
      <React3
        mainCamera="camera"
        fov={75}
        aspect={width/height}
        near={0.1}
        far={1000}
        position={this.cameraPosition}
      >
        <mesh>
          <boxGeometry width={1} height={1} depth={1} />
          <meshBasicMaterial color={0x22ccaa} />
        </mesh>
      </React3>
    )
  }
}
