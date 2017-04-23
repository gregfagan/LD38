export const values = obj => Object.keys(obj).map(key => obj[key])

export const current = gameState => values(gameState.sectors).find(sector => gameState.sector === sector.idx)

export const findInSector = (sector, thing) => sector.items.find(item => item.id === thing)

export const findInCurrentSector = (gameState, thing) => findInSector(current(gameState), thing)

export const find = (gameState, thing) =>
  findInSector(current(gameState)) || gameState.inventory.find(item => item.id === thing)

export const findGlobal = (gameState, thing) =>
  find(gameState, thing) || values(gameState.sectors).reduce((acc, sector) => acc || findInSector(sector, thing), undefined)

export const has = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)

export const updateItemInSector = (sector, newItem) => ({ ...sector, items: sector.items.map(item => (item.id === newItem.id ? newItem : item)) })

export const getSector = (gameState, sectorIdx) => values(gameState.sectors).find(sector => sectorIdx === sector.idx)
