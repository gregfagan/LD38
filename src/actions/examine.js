export default (gameState, target) => {
  if (!target) {
    const text = gameState.inventory.length ?
                  `What do you want to examine?\nYou have:\n${gameState.inventory.map(item => item.shortDescription).join('\n')}` :
                  'Your inventory is empty, there is nothing to examine.'
    return { gameState, text }
  }

  const thing = gameState.inventory.find(item => item.id === target.toUpperCase())
  return thing ? { gameState, text: thing.description } : { gameState, text: `You don't have ${target}` }
}
