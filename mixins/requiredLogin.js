import firebase from '~/utils/firebase'
export default {
  mounted: function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('[INFO] Signin user: ', user)
      } else {
        window.location = '/login'
      }
    })
  }
}
