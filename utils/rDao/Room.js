import firebase from 'firebase'
import Schema from './schema'
export default class Room {
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

  updateField(id, field, payload) {
    console.log(id, field, payload)
    return this.database.ref(`/Rooms/${id}/${field}`).set(payload, function() {
      console.log(' -=-=-= updateField -=-=-=')
    })
  }

  updateById(id, payload) {
    console.log(id, payload)
    return this.database.ref(`/Rooms/${id}`).set(payload, function() {
      console.log(' -=-=-= updateById -=-=-= payload: ', payload)
    })
  }
}

Room.schema = Schema
