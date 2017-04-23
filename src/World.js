import React from 'react'
import ReactDOM from 'react-dom'
import React3 from 'react-three-renderer'
import * as three from 'three'

const phi = (1 + Math.sqrt(5)) / 2
const dihedral = 2 * Math.atan(phi)
const dihedralComplement = (Math.PI) - dihedral

function toRadians(degrees) {
  return degrees * Math.PI / 180
}

function generateUVs() {
  // Using some trig to find UV coordinates of a regular pentagon inscribed
  // into a square texture with one side centered and flush with the bottom
  // of the texture

  // Inscribing the pentagon creates a triangle in the lower left of the square.
  // The H, A, and O values are the hypotenuse, adjacent, and opposite side lengths
  // given the angle which is complement to the interior pentagon angle (72 degrees)
  //
  // the hypotenuse is the side length of the pentagon
  const H = 1 / (1 + 2 * Math.cos(Math.PI / 180 * 72))
  const A = (1 - H) / 2
  const O = H * Math.sin(Math.PI / 180 * 72)

  // This length is the y distance from the left vertex to the top
  // vertex
  const A_TOP = H * Math.cos(Math.PI / 180 * (72 - 18))

  return {
    top: { u: 0.5, v: O + A_TOP },
    left: { u: 0, v: O },
    right: { u: 1, v: O },
    bottomLeft: { u: A, v: 0 },
    bottomRight: { u: (1 - A), v: 0 }
  }
}

function createCanvas(resolution) {
  const canvas = document.createElement('canvas')
  canvas.width = resolution
  canvas.height = resolution
  return canvas
}

export default class World extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.cameraPosition = new three.Vector3(0, 0, 5)
    this.lightPosition = new three.Vector3(0, 0, 15)
    this.lightLookAt = new three.Vector3(0, 0, 0)

    this.canvases = [...Array(12).keys()].map(i => createCanvas(512))
    this.textures = this.canvases.map(c => new three.CanvasTexture(c))
    this.materials = this.textures.map(t => new three.MeshPhongMaterial({
      map: t,
      shading: three.FlatShading,
    }))

    this.handleCanvasRender = this.handleCanvasRender.bind(this)

    window.addEventListener('resize', () => this.forceUpdate())
  }

  componentDidMount() {
    const UVs = generateUVs()
    const geometry = new three.DodecahedronGeometry()
    for (let i = 0; i < 12; ++i) {
      geometry.faces[i * 3    ].materialIndex = i
      geometry.faces[i * 3 + 1].materialIndex = i
      geometry.faces[i * 3 + 2].materialIndex = i

      let faceUVs = geometry.faceVertexUvs[0][i * 3]
      faceUVs[0].x = UVs.left.u
      faceUVs[0].y = UVs.left.v
      faceUVs[1].x = UVs.bottomLeft.u
      faceUVs[1].y = UVs.bottomLeft.v
      faceUVs[2].x = UVs.top.u
      faceUVs[2].y = UVs.top.v

      faceUVs = geometry.faceVertexUvs[0][i * 3 + 1]
      faceUVs[0].x = UVs.bottomLeft.u
      faceUVs[0].y = UVs.bottomLeft.v
      faceUVs[1].x = UVs.bottomRight.u
      faceUVs[1].y = UVs.bottomRight.v
      faceUVs[2].x = UVs.top.u
      faceUVs[2].y = UVs.top.v

      faceUVs = geometry.faceVertexUvs[0][i * 3 + 2]
      faceUVs[0].x = UVs.bottomRight.u
      faceUVs[0].y = UVs.bottomRight.v
      faceUVs[1].x = UVs.right.u
      faceUVs[1].y = UVs.right.v
      faceUVs[2].x = UVs.top.u
      faceUVs[2].y = UVs.top.v
    }

    geometry.uvsNeedUpdate = true

    const mesh = new three.Mesh(geometry, this.materials)
    this.refs.mount.add(mesh)
  }

  handleCanvasRender(index) {
    this.textures[index].needsUpdate = true
  }

  render() {
    const width = window.innerWidth
    const height = window.innerHeight

    const {
      children,
      x_dihedral, y_dihedral, z_dihedral, x_complement, y_complement, z_complement
    } = this.props

    const rotation = new three.Euler(
      dihedral * x_dihedral + dihedralComplement * x_complement,
      dihedral * y_dihedral + dihedralComplement * y_complement,
      dihedral * z_dihedral + dihedralComplement * z_complement,
      // This rotation order allows rotation to take place in world space
      // rather than local space. See https://threejs.org/docs/#api/math/Euler
      'ZYX'
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
          <group rotation={rotation} ref='mount' />
          { React.Children.map(children, (child, i) => (
            React.cloneElement(child, {
              key: i,
              id: i,
              canvas: this.canvases[i],
              didRender: this.handleCanvasRender
            })
          ))}
        </scene>
      </React3>
    )
  }
}
