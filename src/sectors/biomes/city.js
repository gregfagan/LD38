import { LIGHT_SWITCH } from '@items'
import Handlebars from 'handlebars'

const flatten = str => str.replace(/\s+/g, ' ')

export const describeCity = sector => flatten(Handlebars.compile(
`You see a
  {{#if modfiers.marked}}
    city with walls graffitied in smiley faces.
  {{else}}
    shining city. Spotless and immaculate.
  {{/if}}
  {{#if modifiers.power}}
    You hear the hum of electricty powering the grid.
  {{else}}
    You notice that no lights seem to work.
  {{/if}}`
)(sector))

export default () => ({
  biome: 'CITY',
  id: 'CITY',
  items: [LIGHT_SWITCH()],
  modifiers: {
    power: false,
    marked: false
  }
})
