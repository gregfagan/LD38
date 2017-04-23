import { current } from '@util'

export default (gameState) => {
  // Make sure credits are in inventory
  const credits = gameState.inventory.find(item => item === 'CREDITS')
  if (!credits) {
    return { gameState, text: 'You don\'t have any credits to use.' }
  }

  // Make sure you are in the forest
  if (current(gameState).id !== 'FOREST') {
    return { gameState, text: 'You have credits, but you can\'t use them here.' }
  }

  const newForest = { ...gameState.sectors.FOREST, modifiers: { ...gameState.sectors.FOREST.modifiers, paid: true } }
  const newDrone = { ...gameState.items.DRONE, takeable: true }
  const newInventory = gameState.inventory.filter(item => item !== 'CREDITS')

  return { gameState: { ...gameState,
    sectors: { ...gameState.sectors, FOREST: newForest },
    inventory: newInventory,
    items: { ...gameState.items, DRONE: newDrone }
  },
    text: 'The children express their thanks as they run away. You can have the DRONE!'
  }
}
