import input from '@inputtables'
import { getItem, addToBuffer, current } from '@util'
//
// const getField = field => {
//   const [location, ...rest] = field.split('.')
//   if(location === '$SECTOR') {
//
//   }
// }
//
// const parseUse = useDesc =>

export default (gameState, value) => {
  const target = current(gameState).items.find(i => getItem(gameState, i).modifiers.inputtable)
  return (target && input[target]) ? input[target](gameState, value) : addToBuffer('Nothing here to input.')(gameState)
}
