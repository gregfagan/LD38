import React from 'react'
import World from './World'
import Sector from './Sector'

import { current } from '@util'

const bufferText = buffer => buffer.reduce((result, entry) => `${entry}\n${result}`, '')

export default ({ dispatch, ...state }) => (
  <World currentSector={current(state).idx - 1}
    terminalText={bufferText(state.buffer)}
    dispatch={dispatch}>
     {
       Object.values(state.sectors)
        .map(s => <Sector key={s.id} text={s.background} />)
     }
  </World>
)
