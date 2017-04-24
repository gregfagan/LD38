import { getItem, changeSector, changeItem, compose, addToBuffer } from '@util'

export default (gameState) => {
  const lightSwitch = getItem(gameState, 'LIGHT SWITCH')
  const changes = lightSwitch.modifiers.position === 'on' ?
  [changeItem('LIGHT SWITCH', 'position', 'off'), changeSector('CITY', 'power', false),
    addToBuffer('You flip the power switch. Lights turn off.')] :
  [changeItem('LIGHT SWITCH', 'position', 'on'), changeSector('CITY', 'power', true),
    addToBuffer('You flip the power switch. Lights come on.')]

  return compose(changes)(gameState)
}
