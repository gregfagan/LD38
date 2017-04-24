import use from '@useables'
import { addToBuffer, current, inInventory } from '@util'
//
// const getField = field => {
//   const [location, ...rest] = field.split('.')
//   if(location === '$SECTOR') {
//
//   }
// }
//
// const parseUse = useDesc =>

export default (gameState, item, target) => {
  if (!current(gameState).items.find(i => i === item) && !inInventory(item)(gameState)) {
    return addToBuffer('Nothing like that here.')(gameState)
  }
  return (use[item] ? use[item](gameState, target) : addToBuffer(`Don't know how to use ${item}.`)(gameState))
}
