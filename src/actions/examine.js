import { getItem } from '@util'
import { describeItem } from '@describe'

export default (gameState, target) => {
  if (!target) {
    const text = gameState.inventory.length ?
      `What do you want to examine?\nYou have:\n${gameState.inventory.map(item => getItem(gameState, item).shortDescription).join('\n')}` :
      'Your inventory is empty, there is nothing to examine.'
    return { gameState, text }
  }

  const thing = gameState.inventory.find(item => item === target.toUpperCase())
  return thing ? { gameState, text: describeItem(gameState, thing) } : { gameState, text: `You don't have ${target}` }
}
