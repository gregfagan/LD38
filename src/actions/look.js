import { describeSector, describeItem } from '@describe'
import { current, addToBuffer } from '@util'

export default (gameState, target) => {
  const sector = current(gameState)
  if (!target) {
    return addToBuffer(describeSector(sector, gameState))(gameState)
  }

  const thing = current(gameState).items.find(i => i === target)
  return thing ? addToBuffer(describeItem(gameState, thing))(gameState) :
                 addToBuffer(`You don't see ${target}`)(gameState)
}
