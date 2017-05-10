export default next => (action, state) => {
  if (action.type === 'INPUT') {
    return next({ subject: action.target, type: action.type, target: action.subject }, state)
  }
  return next(action, state)
}
