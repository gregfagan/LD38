import React from 'react'
import ReactDOM from 'react-dom'
import WebFont from 'webfontloader'

import dispatcher from './game'
import Game from './render/Game'

const { subscribe, dispatch } = dispatcher()

function render(state) {
  ReactDOM.render(
    <Game dispatch={dispatch} {...state} />,
    document.getElementById('app')
  )
}

function start() {
  subscribe(render)
}

// This thing doesn't seem to do what it is supposed to do
WebFont.load({
  classes: false,
  google: { families: ['Inconsolata'] },
  // Set a timeout to render because this thing doesn't seem to work
  active: () => { setTimeout(start, 500) }
})
