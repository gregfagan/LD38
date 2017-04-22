import React from 'react'
import ReactDOM from 'react-dom'

import RotationControls from './RotationControls'
import World from './World'

ReactDOM.render(
  <RotationControls>
    <World />
  </RotationControls>,
  document.getElementById('app')
)
