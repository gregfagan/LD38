import { getItem, addToBuffer } from '@util'

export default (gameState, target) => {
  if (!target) {
    const text = addToBuffer(gameState.inventory.length ?
                  `You have:\n${gameState.inventory.map(item => getItem(gameState, item).shortDescription).join('\n')}` :
                  'Your inventory is empty.')
    return text(gameState)
  }

  const thing = getItem(gameState, gameState.inventory.find(item => item === target))
  return thing ? addToBuffer(thing.description)(gameState) : addToBuffer(`You don't have ${target}`)(gameState)
}
