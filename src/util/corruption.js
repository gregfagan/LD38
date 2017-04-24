const GLYPHS = ['X', 'x']
const OFFSET = 5
const CORRUPTION_MAX = 45

const sample = arr => arr[Math.floor(Math.random() * arr.length)]
const corruptionLevel = (sector, time) =>
  // console.log(time, sector, time / (sector * ((CORRUPTION_MAX - OFFSET) / 12))) ||
  time / (sector * ((CORRUPTION_MAX - OFFSET) / 12))

const place = (letter, sector, time) => (letter !== ' ' && Math.random() < corruptionLevel(sector, time) ? sample(GLYPHS) : letter)

export default (str, { sector, time }) => str.split('').map(letter => place(letter, sector, time)).join('')

/*

at time === CORRUPTION_MAX + OFFSET, corruption level for sector 12 === 1
(CORRUPTION_MAX - OFFSET) => number of steps till 100% in all SECTORS.
(CORRUPTION_MAX - OFFSET)/12 = steps per sector.
sector * ((CORRUPTION_MAX - OFFSET)/12) = steps for corruption at sector
time / (sector * ((CORRUPTION_MAX - OFFSET)/12)
*/
