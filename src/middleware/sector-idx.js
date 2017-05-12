export default (next, select) => (action, state) => {
  let newState = next(action, state)
  if (action.type === 'START') {
    const objects = select('$OBJECTS', state).get()
    const sectors = Object.keys(objects).map(key => objects[key]).filter(obj => obj.type === 'LOCATION')
    const s = select('$GLOBAL.sectors', state).set(sectors.sort((a, b) => (a.properties.idx > b.properties.idx ? 1 : -1)))
    // console.log(sectors)
    newState = next(action, s)
  }
  if (action.type === 'START' || action.type === 'GO') {
    const newIdx = select('$LOCATION.properties.idx', newState).get()
    // console.log(select('$LOCATION.properties.idx', newState).get(), newIdx - 1)
    return select('$GLOBAL.idx', newState).set(newIdx - 1)
  }
  return newState
}
