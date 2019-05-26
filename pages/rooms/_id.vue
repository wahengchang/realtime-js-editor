<template>
  <div>
    <button @click="onUpdateCodeHandler">update</button>
    <Editor
      v-if="code"
      :code="code"
      :on-update-code-handler="onUpdateCodeHandler"
    />
  </div>
</template>

<script>
import '~/utils/firebase'
import Editor from '~/components/rooms/Editor'
import RoomRDao from '~/utils/rDao/Room'

const roomrDao = new RoomRDao()

export default {
  components: { Editor },
  data: function() {
    return {
      code: null
    }
  },
  mounted: function() {
    this.$store.commit('system/setIsLoading', true)
    const { id } = this.$route.params
    roomrDao.onById(id, this.onRecieveRoomHandler)
  },
  methods: {
    onRecieveRoomHandler: function(data) {
      this.$store.commit('system/setIsLoading', false)
      this.code = data.code || 'console.log("Hello")'
    },
    onUpdateCodeHandler: function(newCodeString = '') {
      console.log(' -=-=-= onUpdateCodeHandler --=-=')
      console.log('newCodeString: ', newCodeString)
      const { id } = this.$route.params
      roomrDao.update(id, 'code', newCodeString || 'console.log("origin")')
    }
  }
}
</script>

<style></style>
