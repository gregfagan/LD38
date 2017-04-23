import { describeCity } from './city'
import { getSector } from '@util'

const describe = (sector) => {
  switch (sector.biome) {
    case 'CITY':
      return describeCity(sector)
    default:
      return 'It\'s a sector'
  }
}


export default (sector, gameState) => {
  const { items, neighbors } = sector
  const description = describe(sector)
  const itemText = items.length ? `Around you is ${items.map(item => item.shortDescription).join(', ')}.` : null
  const exitText = neighbors.map(neighbor => `${neighbor.direction}: ${gameState ? getSector(gameState, neighbor.sector).id : neighbor.sector}`)

  return `You are in Sector ${sector.id}\n${description}\n${itemText ? `${itemText}\n` : ''}\nExits: ${exitText.join(', ')}`
}
