import { registerSystem } from 'aframe'
import dispatcher from '../../game'

// Creates and runs the game session, offers access to its dispatch function.

registerSystem('game', {
  dependencies: [],
  schema: {},

  init() {
    // Create a game session by invoking the dispatcher
    const { subscribe, dispatch } = dispatcher()

    // Components can access the dispatch function to send a line of input
    // to the game.
    this.dispatch = dispatch

    // Before starting the game, we want to make sure the terminal element's
    // text component has finished loading its font.
    const el = document.querySelector('[terminal]')
    if (el) {
      el.addEventListener('textfontset', () => {
        // Start the game by subscribing to state changes, and when it does,
        // emit a `gameUpdate` event on the scene.
        subscribe((newState) => this.sceneEl.emit('gameUpdate', newState))
      })
    } else {
      console.error('No terminal found. Cannot start game.')
    }
  }
})
