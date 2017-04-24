const GLYPHS = ['X', 'x']
const OFFSET = 3
const SCALE = 0.0015

const sample = arr => arr[Math.floor(Math.random() * arr.length)]
const corruptionLevel = (sector, time) => (time * SCALE) / (sector + OFFSET)
const place = (letter, sector, time) => (letter !== ' ' && Math.random() < corruptionLevel(sector, time) ? sample(GLYPHS) : letter)

export default (str, { sector, time }) => str.split('').map(letter => place(letter, sector, time)).join('')
