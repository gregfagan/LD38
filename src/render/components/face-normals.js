import { THREE, registerComponent } from 'aframe'

// Minimum threshold of radian angle difference between unique normals
const EPSILON = 0.01
const MATERIAL = new THREE.LineBasicMaterial({ color: 0xffbbbb })

function getNormals(mesh) {
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
      if (angleToLastNormal < EPSILON) {
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

registerComponent('face-normals', {
  schema: { visualize: { default: false } },
  dependencies: ['geometry'],

  init() {
    const el = this.el
    const geometryComponent = el.components.geometry
    if (geometryComponent && geometryComponent.data.primitive === 'dodecahedron') {
      // Make this an unbuffered geometry to make it easy to read the mesh data
      // TODO: is this easily avoidable?
      el.setAttribute('geometry', 'buffer', false)
      const mesh = el.getObject3D('mesh')
      this.normals = getNormals(mesh)
    }
  },

  update(oldData) {
    if (oldData.visualize !== this.data.visualize) {
      this.updateVisualization()
    }
  },

  remove() {
    this.el.removeObject3D(this.attrName)
  },

  getNormals() {
    return this.normals
  },

  updateVisualization() {
    const el = this.el
    const currentVis = el.getObject3D(this.attrName)
    if (this.data.visualize && !currentVis) {
      this.generateVisualizationIfNeeded()
      if (this.visualization) {
        el.setObject3D(this.attrName, this.visualization)
      }
    } else if (currentVis) {
      el.removeObject3D(this.attrName)
    }
  },

  generateVisualizationIfNeeded() {
    if (!this.visualization && this.normals) {
      const geometry = new THREE.Geometry()
      const zero = new THREE.Vector3()
      this.normals.forEach(n => geometry.vertices.push(zero, n))
      this.visualization = new THREE.LineSegments(geometry, MATERIAL)
    }
  }
})
