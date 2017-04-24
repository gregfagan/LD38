import { describeSector } from '@describe'
import { current, getSector, clearBuffer, addToBuffer, compose, addTime } from '@util'

export default (gameState, direction) => {
  const currentSector = current(gameState)
  const neighborNames = currentSector.neighbors.map(neighbor => getSector(gameState, neighbor.sector).id)

  if (neighborNames.indexOf(direction) < 0) {
    return addToBuffer('That\'s not a place you can go.')(gameState)
  }

  const nextSector = gameState.sectors[direction]

  const changes = compose([
    clearBuffer,
    addTime,
    addToBuffer(describeSector(nextSector, gameState))
  ])
  return changes({ ...gameState, sector: nextSector.idx })
}
