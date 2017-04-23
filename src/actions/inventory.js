import { getItem } from '@util'

export default (gameState, target) => {
  if (!target) {
    const text = gameState.inventory.length ?
                  `You have:\n${gameState.inventory.map(item => getItem(gameState, item).shortDescription).join('\n')}` :
                  'Your inventory is empty.'
    return { gameState, text }
  }

  const thing = getItem(gameState, gameState.inventory.find(item => item === target.toUpperCase()))
  return thing ? { gameState, text: thing.description } : { gameState, text: `You don't have ${target}` }
}
