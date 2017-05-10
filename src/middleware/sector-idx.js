export default (next, select) => (action, state) => {
  let newState
  if (action.type === 'START') {
    const objects = select('$OBJECTS', state).get()
    const sectors = Object.keys(objects).map(key => objects[key]).filter(obj => obj.type === 'LOCATION')
    const s = select('$GLOBAL.sectors', state).set(sectors)
    newState = next(action, s)
  } else {
    newState = next(action, state)
  }
  if (action.type === 'START' || action.type === 'GO') {
    const newIdx = select('$LOCATION.properties.idx', newState).get()
    return select('$GLOBAL.idx', newState).set(newIdx - 1)
  }
  return newState
}
