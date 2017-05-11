export default (next, select) => (originalEvent, state) => {
  if (originalEvent.type === 'USE') {
    const subject = event.subject

    const here = select('$INVENTORY', state).has(subject) ||
                   select('$LOCATION.items', state).has(subject)

    if (!here) {
      return select('$BUFFER', state).add("You don't see that here.")
    }

    next(event, state)
  }
  return next(originalEvent, state)
}
