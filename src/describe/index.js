  import { getSector, getItem } from '@util'

  const flatten = str => str.replace(/\s+/g, ' ')

  import city from './city.hbs'
  import array from './array.hbs'
  import forest from './forest.hbs'
  import vault from './vault.hbs'

  import lightSwitch from './light-switch.hbs'
  import credits from './credits.hbs'

  const itemMap = {
    'LIGHT SWITCH': lightSwitch,
    CREDITS: credits
  }

  const sectorMap = {
    CITY: city,
    ARRAY: array,
    FOREST: forest,
    VAULT: vault
  }

  const describe = (gameState, sector) =>
  (sectorMap[sector.id] ?
    flatten(sectorMap[sector.id](gameState)) :
    'It\'s a sector')


  export const describeSector = (sector, gameState) => {
    const { items, neighbors } = sector
    const description = describe(gameState, sector)
    const itemText = items.length ? `Nearby you see ${items.map(itemId => getItem(gameState, itemId).shortDescription).join(', ')}.` : null
    const exitText = neighbors.map(neighbor => `${gameState ? getSector(gameState, neighbor.sector).id : neighbor.sector}`)

    return `${description}${itemText ? `\n\n${itemText}` : ''}\n\nExits: ${exitText.join(', ')}`
  }

  export const describeItem = (gameState, item) =>
  (itemMap[item] ? itemMap[item](gameState) : 'That item is undescribable.')
