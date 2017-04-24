import React from 'react'
import World from './World'
import Sector from './Sector'

import { current, terminalText } from '@util'
import corruption from '@util/corruption'

const bufferText = buffer => buffer.reduce((result, entry) => `${entry}\n${result}`, '')
// terminalText={bufferText(state.buffer)}

export default ({ dispatch, ...state }) => {
  const sector = current(state)
  return (
    <World currentSector={sector.idx - 1}
           terminalText={terminalText(state)}
           textColor={sector.textColor}
           backgroundColor={sector.backgroundColor}
           dispatch={dispatch}>
       {
         Object.values(state.sectors)
               .map(s => <Sector key={s.id}
                                 textColor={s.backgroundTextColor || '#115511'}
                                 backgroundColor={s.backgroundColor || '#112211'}
                                 text={corruption(s.background, state)} />)
       }
    </World>
  )
}
