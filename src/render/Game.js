import React from 'react'
import World from './World'
import Sector from './Sector'
import getColors from '../colors'

import { current } from '@util'
import corruption from '@util/corruption'

const bufferText = buffer => buffer.reduce((result, entry) => `${entry}\n${result}`, '')

export default ({ dispatch, ...state }) => {
  const sector = current(state)
  const { textColor, backgroundColor } = getColors(sector.id, state)
  return (
    <World currentSector={sector.idx - 1}
           terminalText={bufferText(state.buffer)}
           textColor={textColor}
           backgroundColor={backgroundColor}
           dispatch={dispatch}>
       {
         Object.values(state.sectors)
               .map(s => <Sector key={s.id}
                                 {...getColors(s.id, state)}
                                 text={corruption(s.background, state)} />)
       }
    </World>
  )
}
