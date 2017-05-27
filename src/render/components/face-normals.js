import { THREE, registerComponent } from 'aframe'
import uniqueMeshNormals from '@util/helpers/uniqueMeshNormals'

const MATERIAL = new THREE.LineBasicMaterial({ color: 0xffbbbb })

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
      this.normals = uniqueMeshNormals(mesh)
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
