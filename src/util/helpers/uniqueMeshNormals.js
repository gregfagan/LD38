// Minimum threshold of radian angle difference between unique normals
const EPSILON = 0.01

export default function uniqueMeshNormals(mesh, epsilon = EPSILON) {
  // Find all of the normals on the geometry
  const normals = mesh.geometry.faces.reduce((result, face) => {
    const normal = face.normal.clone()
    if (result.length === 0) {
      result.push(normal)
    } else {
      // When this normal and the last one are pointing in nearly the same direction,
      // they are probably the normals of two triangular components of the same
      // pentagonal face. Instead of adding adding a new entry, we add the new normal
      // to the previous one, and will renormalize afterwards.
      const lastNormal = result[result.length - 1]
      const angleToLastNormal = normal.angleTo(lastNormal)
      if (angleToLastNormal < epsilon) {
        lastNormal.add(normal)
      } else {
        result.push(normal)
      }
    }

    return result
  }, [])
  normals.forEach(normal => normal.normalize())

  return normals
}
