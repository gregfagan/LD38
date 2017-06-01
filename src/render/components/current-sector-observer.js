import { registerComponent } from 'aframe'

registerComponent('current-sector-observer', {
  dependencies: ['rotate-to-face'],
  schema: {},

  init() {
    this.onSectorChange = this.onSectorChange.bind(this)
    this.el.sceneEl.addEventListener('sectorchange', this.onSectorChange)
  },

  remove() {
    this.el.sceneEl.removeEventListener('sectorchange', this.onSectorChange)
  },

  onSectorChange(e) {
    const sectorIdx = e.detail.index
    this.el.setAttribute('rotate-to-face', { index: sectorIdx })
  }
})
