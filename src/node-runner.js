import readline from 'readline'
import { current } from '@util'
import corruption from '@util/corruption'
import dispatcher from './game'
import getColors from './colors'
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const { subscribe, dispatch } = dispatcher

const q = (context) => {
  subscribe((gameState) => {
    console.log(getColors('CITY', gameState))
    console.log(corruption(current(gameState).background, gameState))
    context.question(`${gameState.buffer[0]}\n\n> `, (response) => {
      if (response.toUpperCase() === 'QUIT') {
        context.close()
      } else {
        dispatch(response)
      }
    })
  })
}

q(rl)
