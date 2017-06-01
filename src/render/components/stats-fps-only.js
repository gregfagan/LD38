import { registerComponent } from 'aframe'

// When using the stats scene component, default to hiding everything
// other than the Framerate display

registerComponent('stats-fps-only', {
  dependencies: ['stats'],
  schema: {},

  init() {
    document.querySelectorAll('.rs-group').forEach((el, idx) => {
      // The first stats group is framerate, hide everything else
      if (idx !== 0) {
        el.className += ' hidden'
      }
    })
  }
})
