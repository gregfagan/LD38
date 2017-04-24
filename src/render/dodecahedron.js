import * as three from 'three'

function generateRotations() {
  const phi = (1 + Math.sqrt(5)) / 2
  const dihedral = 2 * Math.atan(phi)
  const dihedralComplement = (Math.PI) - dihedral
  const outerAngle = 36 * (Math.PI / 180)

  // The various faces of the dodecahedron are aligned to angles that can be
  // decomposed by components of the dihedral angle, its complement, and the
  // complement to the interior angle of a regular pentagon. This function
  // simply takes coefficients for those components and combines them into an
  // angle.
  function orient(d, c, o) {
    return (d * dihedral) + (c * dihedralComplement) + (o * outerAngle)
  }

  // This is an array of coefficients as described above.
  const faceOrientations = [
    { x: [0.5, 0, 0], y: [0, 0, 0], z: [0, 0, -3] },
    { x: [0.5, 0.5, 0], y: [-0.5, 0, 0], z: [0, 0, -4.5] },
    { x: [0, 0, 0], y: [-1, -0.5, 0], z: [0, 0, -2.5] },
    { x: [0, 0, 0], y: [1, 0.5, 0], z: [0, 0, -3.5] },
    { x: [-0.5, -0.5, 0], y: [0.5, 0, 0], z: [0, 0, 4.5] },
    { x: [-1.5, -1, 0], y: [0, 0, 0], z: [0, 0, 2] },
    { x: [0.5, 0.5, 0], y: [0.5, 0, 0], z: [0, 0, 0.5] },
    { x: [0, 0, 0], y: [0, 0.5, 0], z: [0, 0, -2.5] },
    { x: [1.5, 1, 0], y: [0, 0, 0], z: [0, 0, 3] },
    { x: [0, 0, 0], y: [0, -0.5, 0], z: [0, 0, -1.5] },
    { x: [-0.5, -0.5, 0], y: [-0.5, 0, 0], z: [0, 0, 1.5] },
    { x: [-0.5, 0, 0], y: [0, 0, 0], z: [0, 0, -2] },
  ]

  return faceOrientations.map(o => (
    new three.Quaternion().setFromEuler(new three.Euler(
      orient(o.x[0], o.x[1], o.x[2]),
      orient(o.y[0], o.y[1], o.y[2]),
      orient(o.z[0], o.z[1], o.z[2]),
      // This rotation order allows rotation to take place in world space
      // rather than local space. See https://threejs.org/docs/#api/math/Euler
      'ZYX'
    ))))
}
export const rotations = generateRotations()

function generateUVs() {
  // Using some trig to find UV coordinates of a regular pentagon inscribed
  // into a square texture with one side centered and flush with the bottom
  // of the texture

  // Inscribing the pentagon creates a triangle in the lower left of the square.
  // The H, A, and O values are the hypotenuse, adjacent, and opposite side lengths
  // given the angle which is complement to the interior pentagon angle (72 degrees)
  //
  // the hypotenuse is the side length of the pentagon
  const complementAngle = 72 * (Math.PI / 180)
  const H = 1 / (1 + (2 * Math.cos(complementAngle)))
  const A = (1 - H) / 2
  const O = H * Math.sin(complementAngle)

  // This length is the vertical distance from the left vertex to the top vertex
  const smallerComplementAngle = (72 - 18) * (Math.PI / 180)
  const A_TOP = H * Math.cos(smallerComplementAngle)

  return {
    top: { u: 0.5, v: O + A_TOP },
    left: { u: 0, v: O },
    right: { u: 1, v: O },
    bottomLeft: { u: A, v: 0 },
    bottomRight: { u: (1 - A), v: 0 }
  }
}

/*eslint no-param-reassign: ["error", { "props": false }]*/
const UVs = generateUVs()
export function updateUVs(geometry) {
  for (let i = 0; i < 12; i += 1) {
    geometry.faces[i * 3].materialIndex = i
    geometry.faces[(i * 3) + 1].materialIndex = i
    geometry.faces[(i * 3) + 2].materialIndex = i

    let faceUVs = geometry.faceVertexUvs[0][i * 3]
    faceUVs[0].x = UVs.left.u
    faceUVs[0].y = UVs.left.v
    faceUVs[1].x = UVs.bottomLeft.u
    faceUVs[1].y = UVs.bottomLeft.v
    faceUVs[2].x = UVs.top.u
    faceUVs[2].y = UVs.top.v

    faceUVs = geometry.faceVertexUvs[0][(i * 3) + 1]
    faceUVs[0].x = UVs.bottomLeft.u
    faceUVs[0].y = UVs.bottomLeft.v
    faceUVs[1].x = UVs.bottomRight.u
    faceUVs[1].y = UVs.bottomRight.v
    faceUVs[2].x = UVs.top.u
    faceUVs[2].y = UVs.top.v

    faceUVs = geometry.faceVertexUvs[0][(i * 3) + 2]
    faceUVs[0].x = UVs.bottomRight.u
    faceUVs[0].y = UVs.bottomRight.v
    faceUVs[1].x = UVs.right.u
    faceUVs[1].y = UVs.right.v
    faceUVs[2].x = UVs.top.u
    faceUVs[2].y = UVs.top.v
  }

  geometry.uvsNeedUpdate = true
}
