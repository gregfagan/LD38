const sample = arr => arr[Math.floor(Math.random() * arr.length)]
const place = (glyphs, density) => () => (Math.random() < density ? sample(glyphs) : ' ')

const buildString = (acc, count, placeFn) => (count > 0 ? buildString(acc + placeFn(), count - 1, placeFn) : acc)

const makeBackground = (glyphs = ['.'], density = 0.3) => buildString('', 2048, place(glyphs, density))


export default (next, select) => (action, state) => {
  const nextState = next(action, state)

  if (action.type === 'START') {
    const sectors = select('$GLOBAL.sectors', nextState).get().map((s) => {
      const backgroundText = makeBackground(s.properties.glyphs, s.properties.density)
      return { ...s, properties: { ...s.properties, backgroundText } }
    })

    return select('$GLOBAL.sectors', nextState).set(sectors)
  }
  return nextState
}
