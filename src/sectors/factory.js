import * as biomes from './biomes'
import { values } from '@util'

const base = {
  type: 'SECTOR',
  items: [],
  modifiers: {}
}

const sectorMap = {
// sectorId: [ne, e, s, w, nw]
  1: [10, 2, 4, 6, 5],
  2: [8, 4, 1, 10, 7],
  3: [4, 8, 12, 11, 6],
  4: [3, 6, 1, 2, 8],
  5: [9, 10, 1, 6, 11],
  6: [11, 5, 1, 4, 3],
  7: [10, 9, 12, 8, 2],
  8: [2, 7, 12, 3, 4],
  9: [5, 11, 12, 7, 10],
  10: [7, 2, 1, 5, 9],
  11: [6, 3, 12, 9, 5],
  12: [8, 7, 9, 11, 3]
}

const directions = ['NE', 'E', 'S', 'W', 'NW']

const mapToExit = sMap => sMap.map((id, idx) => ({ direction: directions[idx], sector: id }))

const makeSector = (idx, biome) => (
  { ...base, idx, neighbors: mapToExit(sectorMap[idx]), ...biome() }
)

export default () => values(biomes)
                           .reduce((acc, biome, idx) => {
                             const sector = makeSector(idx + 1, biome)
                             return { ...acc, [sector.id]: sector }
                           }, {})
