import CITY from './city.hbs'

const locations = {
  CITY
}

export default (location, gameState) => {
  if (locations[location]) {
    return JSON.parse(locations[location](gameState))
  }
  return gameState.sectors[location]
}
