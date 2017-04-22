import { describeSector } from '../sectors'

export default (gameState, target) => {
  const sector = gameState.sectors[gameState.sector]
  if (!target) {
    return { gameState, text: describeSector(sector) }
  }

  const thing = sector.items.find(item => item.id === target.toUpperCase())
  return thing ? { gameState, text: thing.description } :
    { gameState, text: `You don't see ${target}` }
}
