import { use } from '../items'
import { current, has, updateItemInSector, findInSector } from '@util'

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
  (use[item.toUpperCase()] ? use[item.toUpperCase()](gameState, target) : { gameState, text: `Don't know how to use ${item}.` })
