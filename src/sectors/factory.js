import * as sectors from './sectors'
import { values } from '@util'
import background from './background'

const base = {
  type: 'SECTOR',
  items: [],
  modifiers: {}
}
/* export {
01 CITY,
02 ARRAY,
03 DESERT,
04 VAULT,
05 EMPTY,
06 ARCHIVES,
07 LABORATORY,
08 CLUB,
09 POWER_STATION,
10 SETTLEMENT,
11 ARENA,
12 WASTE_PLANT }
*/
const sectorMap = {
// sectorId: [ne, e, s, w, nw]
  // 1: [7, 6, 2, 10, 8],
  // 2: [1, 6, 3, 11, 10],
  // 3: [2, 6, 4, 9, 11],
  // 4: [3, 6, 7, 5, 9],
  // 5: [4, 7, 8, 12, 9],
  // 6: [2, 1, 7, 4, 3],
  7: [6, 1, 8, 5, 4],
  8: [7, 1, 10, 12, 5],
  9: [3, 4, 5, 12, 11],
  10: [1, 2, 11, 12, 8],
  11: [2, 3, 9, 12, 10],
  12: [8, 10, 11, 9, 5]
}

const directions = ['NE', 'E', 'S', 'W', 'NW']

const mapToExit = sMap => sMap.map((id, idx) => ({
  direction: directions[idx],
  sector: id
}))

const makeSector = (idx, sector) => ({
  ...base,
  idx,
  neighbors: mapToExit(sectorMap[idx]),
  ...sector,
  background: background(sector.glyphs || ['.'], sector.density || 0.1)
})

export default () => values(sectors)
                           .reduce((acc, sector, idx) => {
                             const newSector = makeSector(idx + 1, sector)
                             return { ...acc, [newSector.id]: newSector }
                           }, {})
