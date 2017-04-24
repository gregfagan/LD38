import { getSector, getItem } from '@util'
import Handlebars from 'handlebars'

const flatten = str => str.replace(/\s+/g, ' ')

import city from './city.hbs'
import array from './array.hbs'
import forest from './forest.hbs'
import vault from './vault.hbs'

import lightSwitch from './light-switch.hbs'
import credits from './credits.hbs'

const itemMap = {
  'LIGHT SWITCH': Handlebars.compile(lightSwitch),
  CREDITS: Handlebars.compile(credits)
}

const sectorMap = {
  CITY: Handlebars.compile(city),
  ARRAY: Handlebars.compile(array),
  FOREST: Handlebars.compile(forest),
  VAULT: Handlebars.compile(vault)
}

const describe = (gameState, sector) =>
  (sectorMap[sector.id] ?
    flatten(sectorMap[sector.id](gameState)) :
    'It\'s a sector')


export const describeSector = (sector, gameState) => {
  const { items, neighbors } = sector
  const description = describe(gameState, sector)
  const itemText = items.length ? `Around you is ${items.map(itemId => getItem(gameState, itemId).shortDescription).join(', ')}.` : null
  const exitText = neighbors.map(neighbor => `${neighbor.direction}: ${gameState ? getSector(gameState, neighbor.sector).id : neighbor.sector}`)

  return `You are in Sector ${sector.id}\n${description}\n${itemText ? `${itemText}\n` : ''}\nExits: ${exitText.join(', ')}`
}

export const describeItem = (gameState, item) =>
  (itemMap[item] ? itemMap[item](gameState) : 'That item is undescribable.')
