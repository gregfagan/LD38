import React from 'react'
import World from './World'
import Sector from './Sector'
import Music from './Music'
import { props } from '../game'
import track from '../audio/music.m4a'

const bufferText = buffer => buffer.reduce((result, entry) => `${entry}${result.length > 0 ? '\n\n' : ''}${result}`, '')
const listening = state => state.objects.HEADPHONES.properties.listening

const getColors = (location, state) => ({
  backgroundColor: props(location, 'backgroundColor', state),
  textColor: props(location, 'textColor', state),
  backgroundTextColor: props(location, 'backgroundTextColor', state)
})

export default ({ dispatch, ...state }) =>
   (
    <div>
      <World currentSector={state.idx}
             terminalText={bufferText(state.buffer)}
             {...getColors(state.location, state)}
             dispatch={dispatch}>
         {
           state.sectors
                 .map(s => <Sector key={s.properties.idx}
                                  {...getColors(s.id, state)}
                                  //  text={corruption(s.background, state)}
                                />)
         }

      </World>
      <Music playing={listening(state)} src={track} />
    </div>
  )
