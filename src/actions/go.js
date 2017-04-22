import { describeSector } from '../sectors'

export default (gameState, direction) => {
  const currentSector = gameState.sectors[gameState.sector]
  const nextSector = currentSector.neighbors.find(neighbor => neighbor.direction === direction.toUpperCase())
  return {
    text: describeSector(gameState.sectors[nextSector.sector]),
    gameState: { ...gameState, sector: nextSector.sector }
  }
}
