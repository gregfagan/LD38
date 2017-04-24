const GLYPHS = ['X', 'x']
const OFFSET = 1
const SCALE = 1

const sample = arr => arr[Math.floor(Math.random() * arr.length)]
const corruptionLevel = (sector, time) => (time * SCALE) / (sector + OFFSET)
const place = (letter, sector, time) => (letter !== ' ' && Math.random() < corruptionLevel(sector, time) ? sample(GLYPHS) : letter)

export default (str, { sector, time }) => str.split('').map(letter => place(letter, sector, time)).join('')
