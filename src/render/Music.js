import { Howl } from 'howler'

// export default class Music extends React.Component {
//   constructor(props, context) {
//     super(props, context)
//     this.sound = null
//   }
//
//   componentDidMount() {
//     this.load()
//   }
//
//   componentWillReceiveProps(nextProps) {
//     const { src, playing } = nextProps
//     if (src !== this.props.src) this.load()
//     if (playing && !this.sound.playing()) this.sound.play()
//     if (!playing && this.sound.playing()) this.sound.stop()
//   }
//
//   componentWillUnmount() {
//     this.sound = null
//   }
//
//   load() {
//     const { src } = this.props
//     this.sound = new Howl({ src: [src], loop: true, html5: true })
//   }
//
//   render() { return null }
// }
