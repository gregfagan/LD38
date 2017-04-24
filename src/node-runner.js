import readline from 'readline'
import { current } from '@util'
import dispatcher from './game'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const { subscribe, dispatch } = dispatcher()

const q = (context) => {
  subscribe((gameState) => {
    console.log(current(gameState).background)
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
