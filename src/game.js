import { createGame, processor } from 'fbs'
import middleware from './middleware'
import program from './program.json'
import initalState from './state.json'

const { middleware: fbs, props } = processor(program)
const game = createGame(
  { ...initalState, location: 'CITY' },
  [...middleware, fbs]
)
game.dispatch('start')
export { props }
export default game
