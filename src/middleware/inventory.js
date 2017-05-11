export default (next, select) => (action, state) => {
  if (action.type === 'INVENTORY' || action.type === 'INV') {
    const inventory = select('$INVENTORY', state).get().join(', ')

    return select('$BUFFER', state).add(`Inventory: ${inventory}`)
  }
  return next(action, state)
}
