import { current, getItem } from '@util'

export default (gameState, target) => {
  const sector = current(gameState)
  const hasThing = sector.items.find(item => item === target.toUpperCase())
  const thing = hasThing ? getItem(gameState, target.toUpperCase()) : undefined

  if (thing && thing.takeable) {
    const inventory = [...gameState.inventory, thing.id]
    const newSector = { ...sector, items: sector.items.filter(item => item !== thing.id) }
    const sectors = { ...gameState.sectors, [newSector.id]: newSector }
    const newGameState = { ...gameState, sectors, inventory }
    return { gameState: newGameState, text: `You took ${thing.shortDescription}.` }
  }

  if (thing && !thing.takeable) {
    return { gameState, text: thing.rejectText ? thing.rejectText : 'You can\'t take that.' }
  }
  return { gameState, text: `There isn't ${target} to be had.` }
}
