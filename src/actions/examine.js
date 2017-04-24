import { getItem, addToBuffer } from '@util'
import { describeItem } from '@describe'

export default (gameState, target) => {
  if (!target) {
    const next = addToBuffer(gameState.inventory.length ?
      `What do you want to examine?\nYou have:\n${gameState.inventory.map(item => getItem(gameState, item).shortDescription).join('\n')}` :
      'Your inventory is empty, there is nothing to examine.')
    return next(gameState)
  }

  const thing = gameState.inventory.find(item => item === target)
  return thing ? addToBuffer(describeItem(gameState, thing))(gameState) : addToBuffer(`You don't have ${target}`)(gameState)
}
