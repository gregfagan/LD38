// Responsible for the primary input and output of text for the game.
// Manages an HTML <input> element which is drawn offscreen to capture input.

import { registerComponent } from 'aframe'

const prompt = '> '
const bufferTextFromState = state => state.buffer.reduce((result, entry) => `${entry}${result.length > 0 ? '\n\n' : ''}${result}`, '')

registerComponent('terminal', {
  dependencies: ['game', 'text'],
  schema: { showInputElement: { default: true } },

  init() {
    this.createInputElement()
    this.lastBufferText = ''
    this.el.addEventListener('simUpdate', (e) => {
      const state = e.detail
      this.lastBufferText = bufferTextFromState(state)
      this.updateText()
    })
  },

  update(oldData) {
    const { showInputElement } = this.data
    if (showInputElement !== oldData.showInputElement) {
      this.toggleInputElementVisibility()
    }
  },

  tick() {
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
    if (this.inputEl) {
      return
    }

    const inputEl = document.createElement('input')
    inputEl.style.position = 'fixed'
    inputEl.style.bottom = '8vh'
    inputEl.style.transform = 'translateX(-50%)'
    inputEl.style.tabIndex = 0
    inputEl.addEventListener('input', this.onInputChanged.bind(this))
    inputEl.addEventListener('keydown', this.onInputKeyDown.bind(this))
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

  onInputChanged() {
    this.updateText()
  },

  onInputKeyDown(e) {
    let handled = false

    if (e.key === 'Tab') {
      console.log('TODO: autocomplete')
      handled = true
    } else if (e.key === 'Enter') {
      this.el.emit('inputSubmitted', e.target.value, true)
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
