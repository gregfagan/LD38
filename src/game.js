import { createGame, processor } from 'fbs'
import middleware from './middleware'
import program from './program.json'
import initalState from './state.json'

const fbs = processor(program)
const game = createGame(
  { ...initalState, location: 'CITY' },
  [...middleware, fbs]
)
game.dispatch('start')
export default game
