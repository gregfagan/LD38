import { createGame, processor, look, take, go, nothing, start } from 'fbs'
import sectorIdx from './middleware/sector-idx'
import locationName from './middleware/location'
import buffer from './middleware/buffer'
import program from './program.json'
import initalState from './state.json'

const fbs = processor(program)
const game = createGame(
  { ...initalState, location: 'CITY' },
  [sectorIdx, locationName, buffer, start, nothing, go, take, look, fbs]
)
game.dispatch('start')
export default game
