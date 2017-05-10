export default next => (action, state) => {
  console.log(action)
  return next(action, state)
}
