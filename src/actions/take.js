export default (gameState, target) => {
  const sector = gameState.sectors[gameState.sector]
  const thing = sector.items.find(item => item.id === target.toUpperCase())
  if (thing && thing.takeable) {
    const inventory = [...gameState.inventory, thing]
    const items = sector.items.filter(item => item.id !== thing.id)
    const sectors = { ...gameState.sectors, [gameState.sector]: { ...sector, items } }
    const newGameState = { ...gameState, sectors, inventory }
    return { gameState: newGameState, text: `You took ${thing.shortDescription}.` }
  }

  if (thing && !thing.takeable) {
    return { gameState, text: `You can't take ${target}.` }
  }
  return { gameState, text: `There isn't ${target} to be had.` }
}
