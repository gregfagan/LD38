import { describeSector } from '@describe'
import { current, getSector, clearBuffer, addToBuffer } from '@util'

export default (gameState, direction) => {
  const currentSector = current(gameState)
  const nextSector = currentSector.neighbors.find(neighbor => neighbor.direction === direction)
  const state = clearBuffer({ ...gameState, sector: nextSector.sector })
  return addToBuffer(
    describeSector(getSector(gameState, nextSector.sector), gameState)
  )(state)
}
