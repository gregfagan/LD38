import { describeSector } from '@describe'
import { current, getSector, clearBuffer, addToBuffer, compose, addTime } from '@util'

const validDirections = ['NE', 'E', 'S', 'W', 'NW']

export default (gameState, direction) => {
  if (validDirections.indexOf(direction) < 0) {
    return addToBuffer('That\'s not a valid direction.')(gameState)
  }
  const currentSector = current(gameState)
  const nextSector = currentSector.neighbors.find(neighbor => neighbor.direction === direction)
  const changes = compose([
    clearBuffer,
    addTime,
    addToBuffer(describeSector(getSector(gameState, nextSector.sector), gameState))
  ])
  return changes({ ...gameState, sector: nextSector.sector })
}
