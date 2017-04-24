export default ({ canvas, id, onRender, didRender }) => {
  onRender(canvas)
  didRender(id)
  return null
}
