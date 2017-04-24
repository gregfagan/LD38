import { addToBuffer, changeSector, removeFromInventory, addToSector, inInventory, atLocation, compose } from '@util'

export default (gameState) => {
  if (!inInventory('DRONE')(gameState)) {
    return addToBuffer('lol wat DRONE')(gameState)
  }
  if (atLocation('VAULT')(gameState)) {
    const changes = compose([
      changeSector('VAULT', 'guarded', false),
      removeFromInventory('DRONE'),
      addToSector('VAULT', 'CREDITS'),
      addToBuffer('The guard runs after the drone.')
    ])

    return changes(gameState)
  }

  return addToBuffer('You\'ll lose it.')(gameState)
}
