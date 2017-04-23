import describeSector from '@sectors/biomes/description'
import { describeItem } from '@items'
import { current, findInCurrentSector } from '@util'

export default (gameState, target) => {
  const sector = current(gameState)
  if (!target) {
    return { gameState, text: describeSector(sector, gameState) }
  }

  const thing = findInCurrentSector(gameState, target.toUpperCase())
  return thing ? { gameState, text: describeItem(thing) } :
    { gameState, text: `You don't see ${target}` }
}
