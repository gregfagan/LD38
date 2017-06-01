// Responsible for the primary input and output of text for the game.
// Manages an HTML <input> element which is drawn offscreen to capture input.

import { registerComponent } from 'aframe'

const prompt = '> '
const bufferTextFromState = state => state.buffer.reduce(
  (result, entry) => `${entry}${result.length > 0 ? '\n\n' : ''}${result}`,
  ''
)

registerComponent('terminal', {
  dependencies: ['text'],
  schema: { showInputElement: { default: false } },

  init() {
    this.onGameUpdate = this.onGameUpdate.bind(this)
    this.createInputElement()
    this.lastBufferText = ''
    this.el.sceneEl.addEventListener('gameUpdate', this.onGameUpdate)
  },

  update(oldData) {
    const { showInputElement } = this.data
    if (showInputElement !== oldData.showInputElement) {
      this.toggleInputElementVisibility()
    }
  },

  onGameUpdate(e) {
    this.lastBufferText = bufferTextFromState(e.detail.state)
    this.updateText()
  },

  tick() {
    // The input element should basically always have focus. Just enforce it.
    // Should this be behind a current focus check?
    this.inputEl.focus()
  },

  remove() {
    this.removeInputElement()
  },

  updateText() {
    const text = `${this.lastBufferText}\n\n${prompt}${this.inputEl.value}`
    this.el.setAttribute('text', 'value', text)
  },

  createInputElement() {
    if (this.inputEl) { return }

    const inputEl = document.createElement('input')
    inputEl.style.position = 'fixed'
    inputEl.style.bottom = '8vh'
    inputEl.style.transform = 'translateX(-50%)'
    inputEl.style.tabIndex = 0
    inputEl.addEventListener('input', this.onInputElementChanged.bind(this))
    inputEl.addEventListener('keydown', this.onInputElementKeyDown.bind(this))
    document.body.appendChild(inputEl)
    inputEl.focus()
    this.inputEl = inputEl
  },

  toggleInputElementVisibility() {
    // Move off screen when hidden so that it can still maintain focus and send events
    if (this.inputEl) {
      this.inputEl.style.left = `${this.data.showInputElement ? '' : '-'}50vw`
    }
  },

  onInputElementChanged() {
    this.updateText()
  },

  onInputElementKeyDown(e) {
    let handled = false

    if (e.key === 'Tab') {
      console.log('TODO: autocomplete')
      handled = true
    } else if (e.key === 'Enter') {
      this.el.emit('inputSubmitted', e.target.value, true)
      this.el.sceneEl.systems.game.dispatch(e.target.value)
      e.target.value = ''
      this.updateText()
      handled = true
    }

    if (handled) {
      e.preventDefault()
      e.stopPropagation()
    }
  },

  removeInputElement() {
    if (!this.inputEl) {
      return
    }

    this.inputEl.remove()
    this.inputEl = null
  }
})
