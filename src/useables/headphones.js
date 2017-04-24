import { addToBuffer, inInventory, getItem, changeItem, compose } from '@util'

export default (gameState) => {
  // The music player assumes that you cannot drop your headphones, so this shouldn't
  // happen... but if it does, it will need to be updated to stop playing music.
  if (!inInventory('HEADPHONES')(gameState)) {
    return addToBuffer('You must have lost them')(gameState)
  }

  const headphones = getItem(gameState, 'HEADPHONES')
  const changes = headphones.modifiers.listening ?
  [changeItem('HEADPHONES', 'listening', false),
    addToBuffer('You remove the headphones from your head. Anxiety builds within you, nearly reaching despair.')] :
  [changeItem('HEADPHONES', 'listening', true),
    addToBuffer('You jam along to the music. A feeling of hope swells inside you.')]

  return compose(changes)(gameState)
}
