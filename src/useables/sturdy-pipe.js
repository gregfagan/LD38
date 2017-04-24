import { changeSector, removeFromInventory, compose, addToBuffer } from '@util'

export default (gameState) => {
  const changes = compose([
    changeSector('WASTE PLANT', 'running', false),
    removeFromInventory('STURDY PIPE'),
    addToBuffer('You jam the pipe into the waste recycler. It shudders. Stops.')
  ])
  return changes(gameState)
}
