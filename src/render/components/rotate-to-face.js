import { THREE, registerComponent, utils } from 'aframe'

const { debug } = utils
const warn = debug('techoglyph:align-to-face:warn')

registerComponent('rotate-to-face', {
  schema: {
    // Which face index to view — these are indexes into the normals given
    // from the face-normals component, which only returns the set of unique
    // normals for the mesh. This gives a simple list of unique faces on a
    // regular polyhedron.
    index: { type: 'int', default: 0 },

    // This should be 'selector' but using selector causes stack overflow errors
    // Known bug in aframe v0.5.0: see https://github.com/aframevr/aframe/pull/2502
    // target: { type: 'selector', default: '' },
    selector: { type: 'string', default: '' },

    // Enable animated rotation
    animated: { type: 'boolean', default: false },
    duration: { type: 'number', default: 1500 } // in milliseconds
  },

  update(oldData) {
    const { selector, index } = this.data

    if (selector !== oldData.selector) {
      this.normals = null
      this.quaternions = null
      this.target = document.querySelector(selector)
      this.recalculateNormals()
    }

    if (selector !== oldData.selector
        || index !== oldData.index) {
      this.lastRotationBegan = this.el.sceneEl.time
      this.previousIndex = oldData.index === undefined ? 0 : oldData.index
      this.rotate()
    }
  },

  tick() {
    const { previousIndex } = this
    const { animated, index } = this.data
    if (animated && previousIndex !== index) {
      this.rotate()
    }
  },

  remove() {
    this.normals = null
    this.quaternions = null
  },

  recalculateNormals() {
    // TODO: Fix after upgrade to aframe 0.6.0
    // const target = this.data.target
    const { el, target } = this
    if (target) {
      const mesh = target.getObject3D('mesh')
      if (mesh) {
        this.normals = target.components['face-normals'].getNormals()

        const position = el.object3D.position
        const up = THREE.Object3D.DefaultUp
        const m = new THREE.Matrix4()
        this.quaternions = this.normals.map((normal) => {
          m.lookAt(normal, position, up)
          return new THREE.Quaternion().setFromRotationMatrix(m)
        })
      }
    }
  },

  rotate() {
    const { el, quaternions, previousIndex, lastRotationBegan, target } = this
    const { time } = el.sceneEl
    const { index, animated, duration } = this.data

    if (!target || !quaternions || index > quaternions.length) {
      warn('insufficient parameters to rotate')
      return
    }

    // Reorient the entity towards the target
    if (animated) {
      const t = Math.min(1, (time - lastRotationBegan) / duration)
      THREE.Quaternion.slerp(quaternions[previousIndex], quaternions[index], el.object3D.quaternion, t)
    } else {
      el.object3D.quaternion.copy(quaternions[index])
    }
  }
})
