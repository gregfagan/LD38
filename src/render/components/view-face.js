import { THREE, registerComponent, utils } from 'aframe'

const { debug } = utils
const warn = debug('techoglyph:view-face:warn')

registerComponent('view-face', {
  schema: {
    // Distance from the center (not the face) of the target
    distance: { type: 'number', default: 10 },

    // Someimtes you want to look away from the object
    backwards: { type: 'boolean', default: false },

    // Which face index to view -- these are indexes into the normals given
    // from the getNormals() function, which only returns the set of unique
    // normals for the mesh. This gives a simple list of unique faces on a
    // regular polyhedron.
    faceIndex: { type: 'int', default: 0 },

    // This should be 'selector' but using selector causes stack overflow errors
    // Known bug in aframe v0.5.0: see https://github.com/aframevr/aframe/pull/2502
    // target: { type: 'selector', default: '' },
    selector: { type: 'string', default: '' }
  },

  init() {
    const el = this.el

    // Remove incompatible components
    el.removeAttribute('look-controls')
    el.removeAttribute('wasd-controls')
  },

  update(oldData) {
    const { selector, distance, faceIndex, backwards } = this.data

    if (selector !== oldData.selector) {
      this.normals = null
      this.recalculateNormals()
    } else if (distance !== oldData.distance ||
               faceIndex !== oldData.faceIndex ||
               backwards !== oldData.backwards) {
      this.reposition()
    }
  },

  remove() {
  },

  recalculateNormals() {
    // TODO: Fix after upgrade to aframe 0.6.0
    // const target = this.data.target
    const target = document.querySelector(this.data.selector)
    if (target) {
      const mesh = target.getObject3D('mesh')
      if (mesh) {
        this.normals = target.components['face-normals'].getNormals()
        this.reposition()
      }
    }
  },

  reposition: (() => {
    // Outer closure keeps a reusable object away from the garbage collector
    const newPosition = new THREE.Vector3()
    return function reposition() {
      const el = this.el
      const { normals } = this
      const { selector, distance, faceIndex, backwards } = this.data
      const target = document.querySelector(selector)

      if (!target || !normals || faceIndex > normals.length) {
        warn('insufficient parameters to reposition')
        return
      }

      // Reposition the entity to be distance meters from center along
      // the chosen face's normal
      const targetPosition = target.object3D.position
      newPosition.copy(normals[faceIndex])
      newPosition.multiplyScalar(distance)
      newPosition.add(targetPosition)
      el.setAttribute('position', newPosition)

      // Reorient the entity towards the target
      el.object3D.up = THREE.Object3D.DefaultUp
      el.object3D.lookAt(targetPosition)

      // Turn around, some things want to point in the opposite direction
      // (camera, for one)
      if (backwards) {
        el.object3D.rotation.x += Math.PI
        el.object3D.rotation.z += Math.PI
      }
    }
  })()
})
