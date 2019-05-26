import firebase from 'firebase'

export default class Template {
  constructor() {
    this.database = firebase.database()
    this.ref = this.database.ref('Rooms')
  }

  onById(id, cb) {
    return this.database.ref('/Rooms/' + id).on('value', snapshot => {
      const body = snapshot.val()

      if (cb) {
        cb({
          ...body,
          id
        })
      }
    })
  }

  update(id, field, payload) {
    console.log(id, field, payload)
    return this.database.ref(`/Rooms/${id}/${field}`).set(payload, function() {
      console.log(' -=-=-= updated -=-=-=')
    })
  }
}
