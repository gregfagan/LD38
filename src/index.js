import React from 'react'
import ReactDOM from 'react-dom'

import RotationControls from './RotationControls'
import World from './World'

ReactDOM.render(
  <RotationControls>
    <World>
       { [...Array(12).keys()].map(index => (
         <CanvasTextRenderer key={index} text={
           index < 10 ? index : index === 10 ? 'a' : 'b'
         }/>
       ))}
    </World>
  </RotationControls>,
  document.getElementById('app')
)
