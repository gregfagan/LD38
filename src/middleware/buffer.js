export default (next, select) => (action, state) => {
  if (action.type === 'GO') {
    const newState = select('$BUFFER', state).set([])
    return next(action, newState)
  }
  return next(action, state)
}
