import Base from './Base'
export default class Template extends Base {
  constructor() {
    super()
    this.ref = this.database.ref('Rooms')
  }
}

Template.DEFAULT_ROOM = {
  code: `console.log('hello')`
}
