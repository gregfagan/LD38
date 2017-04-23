import describeSector from '@sectors/biomes/description'
import { current, getSector } from '@util'

export default (gameState, direction) => {
  const currentSector = current(gameState)
  const nextSector = currentSector.neighbors.find(neighbor => neighbor.direction === direction.toUpperCase())
  return {
    text: describeSector(getSector(nextSector.sector, gameState)),
    gameState: { ...gameState, sector: nextSector.sector }
  }
}
