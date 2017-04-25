import { describeSector } from '@describe'
import { current, getSector, addToSector, changeSector, clearBuffer, addToBuffer, compose, addTime } from '@util'

const eventuallyWreckInArena = (gameState) => {
  const arena = gameState.sectors.ARENA

  if (arena.modifiers.wreckage) {
    return gameState
  } else if (arena.modifiers.visits >= arena.modifiers.visitsUntilWreck) {
    return compose([
      changeSector('ARENA', 'wreckage', true),
      addToSector('ARENA', 'POWER COUPLER')
    ])(gameState)
  }

  return changeSector('ARENA', 'visits', arena.modifiers.visits + 1)(gameState)
}

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
    eventuallyWreckInArena,
    addToBuffer(describeSector(nextSector, gameState))
  ])
  return changes({ ...gameState, sector: nextSector.idx })
}
