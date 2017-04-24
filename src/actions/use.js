import use from '@useables'
import { addToBuffer } from '@util'
//
// const getField = field => {
//   const [location, ...rest] = field.split('.')
//   if(location === '$SECTOR') {
//
//   }
// }
//
// const parseUse = useDesc =>

export default (gameState, item, target) =>
  (use[item] ? use[item](gameState, target) : addToBuffer(`Don't know how to use ${item}.`)(gameState))
