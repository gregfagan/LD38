import { registerComponent } from 'aframe'
import dispatcher from '../../game'

const { subscribe, dispatch } = dispatcher()
const bufferText = buffer => buffer.reduce((result, entry) => `${entry}${result.length > 0 ? '\n\n' : ''}${result}`, '')

registerComponent('game', {
  dependencies: ['text'],
  schema: {},

  init() {
    this.dispatch = dispatch
    const el = this.el
    // Wait until the font is loaded to start, otherwise text won't
    // update properly.
    el.addEventListener('textfontset', () => {
      subscribe((state) => {
        el.setAttribute('text', 'value', bufferText(state.buffer))
        document.querySelectorAll('[view-face]').forEach(
          entity => entity.setAttribute('view-face', 'faceIndex', state.sector - 1)
        )
      })
    })
  },
})

// import Music from './Music'
// import getColors from '../colors'
//
// import track from '../audio/music.m4a'
//
// import { current, getItem } from '@util'
// import corruption from '@util/corruption'
//
// const bufferText = buffer => buffer.reduce((result, entry) => `${entry}${result.length > 0 ? '\n\n' : ''}${result}`, '')
// const listening = state => getItem(state, 'HEADPHONES').modifiers.listening
//
// export default ({ dispatch, ...state }) => {
//   const sector = current(state)
//   const { textColor, backgroundColor } = getColors(sector.id, state)
//   return (
//     <div>
//       <World currentSector={sector.idx - 1}
//              terminalText={bufferText(state.buffer)}
//              textColor={textColor}
//              backgroundColor={backgroundColor}
//              dispatch={dispatch}>
//          {
//            Object.values(state.sectors)
//                  .map(s => <Sector key={s.id}
//                                    {...getColors(s.id, state)}
//                                    text={corruption(s.background, state)} />)
//          }
//
//       </World>
//       <Music playing={listening(state)} src={track} />
//     </div>
//   )
// }
