const sample = arr => arr[Math.floor(Math.random() * arr.length)]
const place = (glyphs, density) => () => (Math.random() < density ? sample(glyphs) : ' ')

const buildString = (acc, count, placeFn) => (count > 0 ? buildString(acc + placeFn(), count - 1, placeFn) : acc)

export default (glyphs, density) => buildString('', 2048, place(glyphs, density))
