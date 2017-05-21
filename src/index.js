// import WebFont from 'webfontloader'

// import dispatcher from './game'
import scene from './render/scene.html'

// const { subscribe, dispatch } = dispatcher()

const container = document.getElementById('scene')
container.innerHTML = scene

// function render(state) {}
// function start() { subscribe(render) }
//
// // This thing doesn't seem to do what it is supposed to do
// WebFont.load({
//   classes: false,
//   google: { families: ['Inconsolata'] },
//   // Set a timeout to render because this thing doesn't seem to work
//   active: () => { setTimeout(start, 500) }
// })
