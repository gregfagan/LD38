import ARRAY from './array.hbs'
import CITY from './city.hbs'
import EMPTY from './empty.hbs'
import DESERT from './desert.hbs'
import ARCHIVES from './archives.hbs'
import LABORATORY from './laboratory.hbs'
import CLUB from './club.hbs'
import POWER_STATION from './power-station.hbs'
import SETTLEMENT from './settlement.hbs'
import TWELVE from './twelve.hbs'
import VAULT from './vault.hbs'
import WASTE_PLANT from './waste-plant.hbs'

const locations = {
  CITY,
  ARRAY,
  DESERT,
  EMPTY,
  ARCHIVES,
  LABORATORY,
  CLUB,
  'POWER STATION': POWER_STATION,
  SETTLEMENT,
  TWELVE,
  VAULT,
  'WASTE PLANT': WASTE_PLANT
}

export default (location, gameState) => {
  if (locations[location]) {
    return JSON.parse(locations[location](gameState))
  }
  return gameState.sectors[location]
}
