import { addToBuffer } from '@util'

export default gameState => addToBuffer('Commands: GO <location>, TAKE, LOOK (at <item>), INVENTORY, INPUT <value>, USE <item>, EXAMINE <item in inventory>')(gameState)
