import React from 'react'
import World from './World'
import Sector from './Sector'
import Music from './Music'

import track from '../audio/music.m4a'

import { current, getItem } from '@util'
import corruption from '@util/corruption'

const bufferText = buffer => buffer.reduce((result, entry) => `${entry}\n${result}`, '')
const listening = state => getItem(state, 'HEADPHONES').modifiers.listening

export default ({ dispatch, ...state }) => {
  const sector = current(state)
  return (
    <div>
      <World currentSector={sector.idx - 1}
             terminalText={bufferText(state.buffer)}
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
      <Music playing={listening(state)} src={track} />
    </div>
  )
}
