import React from 'react'
import ReactDOM from 'react-dom'
import React3 from 'react-three-renderer'
import {
  Vector3,
  Euler,
  FlatShading
} from 'three'

const phi = (1 + Math.sqrt(5)) / 2
const dihedral = 2 * Math.atan(phi) // * 180 / Math.PI

function toRadians(degrees) {
  return degrees * Math.PI / 180
}

export default class World extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.rotation = new Euler(1 * dihedral, 0, 0)
    // this.rotation = new Euler(0, 0.5 * dihedral, 0)
    // this.rotation = new Euler(0, toRadians(90), 0)

    this.cameraPosition = new Vector3(0, 0, 5)
    this.lightPosition = new Vector3(0, 0, 15)
    this.lightLookAt = new Vector3(0, 0, 0)

    window.addEventListener('resize', () => this.forceUpdate())
  }

  componentWillReceiveProps(nextProps) {
    this.rotation.x = nextProps.x * dihedral
  }

  render() {
    const width = window.innerWidth
    const height = window.innerHeight

    const rotation = new Euler(
      dihedral * this.props.x,
      0,
      0
    )

    return (
      <React3
        mainCamera="camera"
        width={width}
        height={height}
      >
        <scene>
          <perspectiveCamera
            name="camera"
            fov={20}
            aspect={width/height}
            near={0.1}
            far={1000}
            position={this.cameraPosition}
          />
          <ambientLight intensity={0.2} />
          <directionalLight
            position={this.lightPosition}
            lookAt={this.lightLookAt}
          />
          <mesh rotation={rotation}>
            <dodecahedronGeometry radius={1} />
            <meshBasicMaterial wireframe={true} color={0x9911cc} />
            {/* <meshPhongMaterial shading={FlatShading} color={0x22ccaa} /> */}
          </mesh>
          <mesh rotation={rotation}>
            <boxGeometry width={1} height={1} depth={1} />
            <meshPhongMaterial
              wireframe={false}
              shading={FlatShading}
              color={0x00ffcc}
            />
          </mesh>
        </scene>
      </React3>
    )
  }
}
