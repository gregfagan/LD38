import { describeSector } from '@describe'
import { current, getSector, clearBuffer, addToBuffer } from '@util'

const validDirections = ['NE', 'E', 'S', 'W', 'NW']

export default (gameState, direction) => {
  if (validDirections.indexOf(direction) < 0) {
    return addToBuffer('That\'s not a valid direction.')(gameState)
  }
  const currentSector = current(gameState)
  const nextSector = currentSector.neighbors.find(neighbor => neighbor.direction === direction)
  const state = clearBuffer({ ...gameState, sector: nextSector.sector })
  return addToBuffer(
    describeSector(getSector(gameState, nextSector.sector), gameState)
  )(state)
}
