<template>
  <section class="container">
    <div>
      <logo />
      <h2 class="subtitle">Hi {{ displayName }}, you are the secret</h2>
      <button @click="onClickLogoutHandler">Logout</button>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import requiredLogin from '~/mixins/requiredLogin'
import firebase from 'firebase'
export default {
  components: {
    Logo
  },
  mixins: [requiredLogin],
  data: function() {
    return { displayName: null }
  },
  mounted: function() {
    const self = this
    firebase.auth().onAuthStateChanged(function(user) {
      console.log(user.displayName)
      self.displayName = user.displayName
    })
  },
  methods: {
    onClickLogoutHandler: function() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          window.location.reload()
        })
        .catch(function(error) {
          console.log('[Error] log out fail: ', error)
        })
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
