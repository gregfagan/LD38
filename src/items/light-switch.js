import { current, has, updateItemInSector, findInSector } from '@util'

export const use = (gameState, target) => {
  if (target && target.type !== 'SECTOR') {
    return { gameState, text: 'You can\t use the LIGHT_SWITCH on that.' }
  }

  const newSector = { ...current(gameState) }
  if (has(newSector.modifiers, 'power')) {
    newSector.modifiers.power = true
    console.log(newSector.modifiers, current(gameState).modifiers)
    const lightSwitch = findInSector(newSector, 'LIGHT SWITCH')
    const newerSector = updateItemInSector(newSector, { ...lightSwitch, modifiers: { ...lightSwitch.modifiers, position: 'on' } })
    const sectors = { ...gameState.sectors, [newerSector.id]: newerSector }
    const newGameState = { ...gameState, sectors }
    return { gameState: newGameState, text: 'You flip the power switch. Lights come on.' }
  }

  return { gameState, text: 'You flip the power switch, but nothing happens.' }
}

// const use = [
//   {
//     conditions: {
//       'LIGHT SWITCH.modifiers.position': 'on'
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

export const describe = item => `The light switch is ${item.modifiers.position}.`

export default () => ({
  type: 'ITEM',
  id: 'LIGHT SWITCH',
  shortDescription: 'a LIGHT SWITCH',
  description: 'The light switch is off.',
  modifiers: {
    position: 'off'
  },
  takeable: false
})
