export const values = obj => Object.keys(obj).map(key => obj[key])

export const current = gameState => values(gameState.sectors).find(sector => gameState.sector === sector.idx)

export const has = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)

export const getSector = (gameState, sectorIdx) => values(gameState.sectors).find(sector => sectorIdx === sector.idx)

export const getItem = (gameState, id) => values(gameState.items).find(item => item.id === id)

export const addToInventory = item => gameState => ({ ...gameState, inventory: [...gameState.inventory, item] })
export const removeFromInventory = item => gameState => ({ ...gameState, inventory: gameState.inventory.filter(i => i !== item) })

export const removeFromSector = (sectorId, item) => (gameState) => {
  const sector = gameState.sectors[sectorId]
  const newSector = { ...sector, items: sector.items.filter(i => i !== item) }
  return { ...gameState, sectors: { ...gameState.sectors, [sectorId]: newSector } }
}

export const addToSector = (sectorId, item) => (gameState) => {
  const sector = gameState.sectors[sectorId]
  const newSector = { ...sector, items: [item, ...sector.items] }
  return { ...gameState, sectors: { ...gameState.sectors, [sectorId]: newSector } }
}

export const changeSector = (sectorId, prop, value) => (gameState) => {
  const sector = gameState.sectors[sectorId]
  const newSector = { ...sector, modifiers: { ...sector.modifiers, [prop]: value } }
  return { ...gameState, sectors: { ...gameState.sectors, [sectorId]: newSector } }
}

export const changeItem = (itemId, prop, value) => (gameState) => {
  const item = gameState.items[itemId]
  const newItem = { ...item, modifiers: { ...item.modifiers, [prop]: value } }
  return { ...gameState, items: { ...gameState.items, [itemId]: newItem } }
}

export const inInventory = itemId => gameState => gameState.inventory.find(item => item === itemId)
export const atLocation = sectorId => gameState => current(gameState).id === sectorId
export const compose = fns => gameState => fns.reduce((acc, fn) => fn(acc), gameState)
export const addToBuffer = text => gameState => ({ ...gameState, buffer: [text, ...gameState.buffer] })
export const clearBuffer = gameState => ({ ...gameState, buffer: [] })
