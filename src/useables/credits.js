import { addToBuffer, changeSector, changeItem, removeFromInventory, inInventory, atLocation, compose } from '@util'
// import definition from './credits.json'
//
// const locationPass = locationId => gameState => current(gameState).id === locationId
// const inventoryHasPass =
//
// const parseRequirements = requirements => gameState => {
//   requirements.map()
// }

export default (gameState) => {
  // Make sure credits are in inventory
  if (!inInventory('CREDITS')(gameState)) {
    return addToBuffer('You don\'t have any credits to use.')(gameState)
  }

  const changes = compose([
    changeItem('DRONE', 'takeable', true),
    removeFromInventory('CREDITS'),
    addToBuffer('The children express their thanks as they run away. You can have the DRONE!')
  ])

  return changes(gameState)
}
