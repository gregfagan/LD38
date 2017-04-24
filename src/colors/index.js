import ARRAY from './array.hbs'
import CITY from './city.hbs'
import ISLAND from './island.hbs'
import FOREST from './forest.hbs'

const locations = {
  CITY,
  ARRAY,
  ISLAND,
  FOREST
}

export default (location, gameState) => {
  if (locations[location]) {
    return JSON.parse(locations[location](gameState))
  }
  return gameState.sectors[location]
}
