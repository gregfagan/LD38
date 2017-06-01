import { registerComponent } from 'aframe'

registerComponent('zoom-on-sector-change', {
  dependencies: [],
  schema: {
    duration: { default: 1000 },
    distance: { default: 10 },
  },

  init() {
    this.onSectorChange = this.onSectorChange.bind(this)
    this.el.sceneEl.addEventListener('sectorchange', this.onSectorChange)

    const { duration, distance } = this.data
    this.el.setAttribute('animation', {
      property: 'position',
      // TODO: animejs supports custom bezier functions, but currently
      // the animation component is using an older version of the lib.  
      // easing: [0.210, -0.450, 0.480, 0.995],
      easing: 'easeInOutBack',
      to: `0 0 ${distance}`,
      dir: 'alternate',
      dur: duration,
      startEvents: 'sectorchange',
    })
  },

  onSectorChange(e) {
    // Forward the message to itself so the animation component
    // will receive it
    this.el.emit('sectorchange', e.detail, false)
  }
})
