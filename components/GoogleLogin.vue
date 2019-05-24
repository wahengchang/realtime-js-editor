<template>
  <div>
    <div text-xs-center xs12 sm6 offset-sm3>
      <button class="signIn mb-2" @click="googleSignUp">
        Google Sign In
      </button>
    </div>
  </div>
</template>

<script>
import firebase, { auth } from '~/utils/firebase'

export default {
  methods: {
    async googleSignUp() {
      await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      console.log('Finished Google login')
      return location.reload()
    }
  }
}
</script>

<style lang="css">
.signIn {
}
</style>
