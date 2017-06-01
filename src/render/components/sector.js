import { registerSystem } from 'aframe'

registerSystem('sector', {
  dependencies: ['game'],

  init() {
    this.onGameUpdate = this.onGameUpdate.bind(this)
    this.sceneEl.addEventListener('gameUpdate', this.onGameUpdate)
  },

  onGameUpdate(e) {
    const { state, oldState } = e.detail
    const oldIndex = ((oldState && oldState.sector) || state.sector) - 1
    const index = state.sector - 1
    if (index !== oldIndex) {
      this.sceneEl.emit('sectorchange', { index, oldIndex })
    }
  }
})
