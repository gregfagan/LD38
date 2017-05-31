import { registerComponent } from 'aframe'

registerComponent('current-sector-observer', {
  dependencies: ['rotate-to-face'],
  schema: {},

  init() {
    const el = this.el
    el.sceneEl.addEventListener('gameUpdate', (e) => {
      const sectorIdx = e.detail.sector - 1
      // Find out where we're headed
      // const destEl = document.createElement('a-entity')
      el.setAttribute('rotate-to-face', { index: sectorIdx })
      // destEl.addEventListener('loaded', () => {
        // const rotation = destEl.object3D.rotation
        // const normal = destEl.components['align-to-face'].normals[sectorIdx]
        // console.log('cso', rotation, normal)
      // })
      // el.sceneEl.appendChild(destEl)
    })
  },
})
