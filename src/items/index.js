import ROCK from './rock'
import MARKER from './marker'
import LIGHT_SWITCH, { use as useLightSwitch, describe as describeLightSwitch } from './light-switch'

const use = {
  'LIGHT SWITCH': useLightSwitch
}

const items = {
  'LIGHT SWITCH': describeLightSwitch
}

const describeItem = item =>
 (items[item.id] ? items[item.id](item) : 'That item is undescribable.')


export { ROCK, MARKER, LIGHT_SWITCH, use, describeItem }
