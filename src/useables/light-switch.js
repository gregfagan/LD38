import { current, has, getItem } from '@util'

// const use = [
//   {
//     conditions: {
//       'items.LIGHT SWITCH.modifiers.position': 'on'
//     },
//     results: {
//       'LIGHT SWITCH.modifiers.position': 'off',
//       'CITY.modifiers.power': false
//     },
//     text: 'You flip the power switch. Lights turn off.'
//   },
//   {
//     conditions: {
//       'LIGHT SWITCH.modifiers.position': 'off'
//     },
//     results: {
//       'LIGHT SWITCH.modifiers.position': 'on',
//       'CITY.modifiers.power': true
//     },
//     text: 'You flip the power switch. Lights turn off.'
//   }
// ]


export default (gameState, target) => {
  if (target && target.type !== 'SECTOR') {
    return { gameState, text: 'You can\t use the LIGHT_SWITCH on that.' }
  }

  const newSector = { ...current(gameState) }
  if (has(newSector.modifiers, 'power')) {
    newSector.modifiers.power = true
    const lightSwitch = getItem(gameState, 'LIGHT SWITCH')
    const newItem = { ...lightSwitch, modifiers: { ...lightSwitch.modifiers, position: 'on' } }
    const sectors = { ...gameState.sectors, [newSector.id]: newSector }
    const newGameState = { ...gameState, sectors, items: { ...gameState.items, LIGHT_SWITCH: newItem } }
    return { gameState: newGameState, text: 'You flip the power switch. Lights come on.' }
  }

  return { gameState, text: 'You flip the power switch, but nothing happens.' }
}
