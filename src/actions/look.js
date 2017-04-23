import { describeSector, describeItem } from '@describe'
import { current, findInCurrentSector } from '@util'

export default (gameState, target) => {
  const sector = current(gameState)
  if (!target) {
    return { gameState, text: describeSector(sector, gameState) }
  }

  const thing = findInCurrentSector(gameState, target.toUpperCase())
  return thing ? { gameState, text: describeItem(gameState, thing) } :
    { gameState, text: `You don't see ${target}` }
}
