import { addToBuffer, changeSector, addToSector, compose } from '@util'

export default (gameState, value) => {
  if (value === '2235') {
    const changes = compose([
      changeSector('LABORATORY', 'locked', false),
      addToSector('LABORATORY', 'BLUEPRINTS'),
      addToBuffer('The code unlocks the safe.')
    ])
    return changes(gameState)
  }

  return addToBuffer('That code does nothing.')(gameState)
}
