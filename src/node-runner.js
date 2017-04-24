import readline from 'readline'
import { factory } from '@sectors'
import { describeSector } from '@describe'
import { current, addToBuffer } from '@util'
import * as actions from '@actions'
import * as items from '@items'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const initGame = {
  sector: 1,
  sectors: factory(),
  inventory: ['CREDITS'],
  buffer: [],
  items
}

const parseInput = (input) => {
  const [action, ...rest] = input.split(' ').map(i => i.toUpperCase())
  switch (action) {
    case 'L':
    case 'LOOK': {
      const [, ...target] = rest
      return { action, target: target.join(' ') }
    }
    case 'GO': {
      const [target] = rest
      return { action, target }
    }
    case 'TAKE': {
      return { action, target: rest.join(' ') }
    }
    case 'I':
    case 'INV':
    case 'INVENTORY': {
      return { action, target: rest.join(' ') }
    }
    case 'E':
    case 'EX':
    case 'EXAMINE': {
      return { action, target: rest.join(' ') }
    }
    case 'USE': {
      return { action, target: rest.join(' ') }
    }
    default:
      return { action }
  }
}

const performAction = (input, gameState) => {
  const { action, target } = parseInput(input)
  return (actions[action] ? actions[action](gameState, target) : addToBuffer('Not understood.', gameState))
}

const q = (context, gameState) => {
  context.question(`${gameState.buffer[0]}\n\n> `, (response) => {
    if (response.toUpperCase() === 'QUIT') {
      context.close()
    } else {
      q(context, performAction(response, gameState))
    }
  })
}

q(rl, addToBuffer(describeSector(current(initGame), initGame))(initGame))
