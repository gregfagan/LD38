import { current, getItem, addToInventory, removeFromSector, compose, addToBuffer } from '@util'

export default (gameState, target) => {
  const sector = current(gameState)
  const hasThing = sector.items.find(item => item === target)
  const thing = hasThing ? getItem(gameState, target) : undefined

  if (thing && thing.modifiers.takeable) {
    const changes = compose([addToInventory(thing.id), removeFromSector(sector.id, thing.id), addToBuffer(`You took ${thing.shortDescription}.`)])
    return changes(gameState)
  }

  if (thing && !thing.modifiers.takeable) {
    return addToBuffer(thing.rejectText ? thing.rejectText : 'You can\'t take that.')(gameState)
  }
  return addToBuffer(`There isn't ${target} to be had.`)(gameState)
}
