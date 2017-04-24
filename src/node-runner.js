import readline from 'readline'
import { current, terminalText } from '@util'
import corruption from '@util/corruption'
import dispatcher from './game'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const { subscribe, dispatch } = dispatcher()

const q = (context) => {
  subscribe((gameState) => {
    console.log(corruption(current(gameState).background, gameState))
    context.question(`${terminalText(gameState)}\n\n> `, (response) => {
      if (response.toUpperCase() === 'QUIT') {
        context.close()
      } else {
        dispatch(response)
      }
    })
  })
}

q(rl)
