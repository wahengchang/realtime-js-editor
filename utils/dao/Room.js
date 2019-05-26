import Base from './Base'
export default class Template extends Base {
  constructor() {
    super()
    this.ref = this.database.ref('Rooms')
  }
}

// Template.DEFAULT_ROOM = {
//   code: `console.log('hello')`
// }
Template.DEFAULT_ROOM = {
  version: 0,
  doc: JSON.stringify({
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [{ type: 'text', text: "Let's start collaborating. Yeah!" }]
      }
    ]
  })
}
