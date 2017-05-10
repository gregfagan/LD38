export default (next, select) => (action, state) => {
  if (action.type === 'GO' || action.type === 'START') {
    const nextState = next(action, state)
    const location = select('$LOCATION', nextState).get()

    return select('$BUFFER', nextState)
              .add(
`You are now at ${location.properties.name}.

Your exits are ${location.exits.join(', ')}

${location.items.length > 0 ? `Around you, you see ${location.items.join(', ')}` : ''}`
)
  }

  return next(action, state)
}
