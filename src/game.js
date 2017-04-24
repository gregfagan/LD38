import factory from '@sectors'
import { describeSector } from '@describe'
import { current, addToBuffer } from '@util'
import * as actions from '@actions'
import * as items from '@items'

const initGame = {
  sector: 1,
  time: 0,
  corruptionStart: 5,
  corruptionMax: 35,
  sectors: factory(),
  inventory: ['DRONE'],
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
      return { action, target: rest.join(' ') }
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
  return (actions[action] ? actions[action](gameState, target) : addToBuffer('Not understood.')(gameState))
}

export default () => {
  let state = addToBuffer(describeSector(current(initGame), initGame))(initGame)
  const subscribers = []

  const next = newState => subscribers.forEach(cb => cb(newState))

  return {
    subscribe: (cb) => { subscribers.push(cb); cb(state) },
    dispatch: (action) => {
      state = performAction(action, state)
      next(state)
    }
  }
}
