<template>
  <div>
    <h1>Hi {{ _user.displayName }}</h1>

    <section>
      <button @click="onClickAddTemplate">add</button>

      <TemplateList
        :data-list="templateList"
        :on-click-remove="onClickRemoveTemplate"
      />
    </section>

    <section>
      <button @click="onClickAddRoom">Create Room</button>

      <RoomList :data-list="roomList" :on-click-remove="onClickRemoveRoom" />
    </section>
  </div>
</template>

<script>
import requiredLogin from '~/mixins/requiredLogin'
import TemplateDao from '~/utils/dao/Template'
import RoomDao from '~/utils/dao/Room'
import TemplateList from '~/components/my/TemplateList'
import RoomList from '~/components/my/RoomList'

const { DEFAULT_ROOM } = RoomDao
const tDao = new TemplateDao()
const roomDao = new RoomDao()

export default {
  components: { TemplateList, RoomList },
  mixins: [requiredLogin],
  data: function() {
    return {
      templateList: null,
      roomList: null
    }
  },
  computed: {
    _user() {
      return this.user
    }
  },
  mounted: function() {
    return Promise.all([this.fetchTemplateList(), this.fetchRoomList()])
  },
  methods: {
    // -=-=-=-=-=-=-=-= click template event -=-=-=-=-=-=
    onClickAddTemplate: async function() {
      const name = `peter-${new Date().getTime()}`
      await tDao.create({ name })
      window.location.reload()
    },
    onClickRemoveTemplate: async function(id) {
      if (!id) console.log('[ERROR] template id is null')
      await tDao.remove(id)
      window.location.reload()
    },
    // -=-=-=-=-=-=-=-= click room event -=-=-=-=-=-=
    onClickAddRoom: async function() {
      const name = `peter-room-${new Date().getTime()}`
      const creator = this.user.email

      console.log('-=-=-=-=-=: ')
      const payload = { ...DEFAULT_ROOM, name, creator }
      console.log('DEFAULT_ROOM: ', DEFAULT_ROOM)
      console.log('payload: ', payload)
      const res = await roomDao.create(payload)
      return (window.location = `/rooms/${res.id}`)
    },
    onClickRemoveRoom: async function(id) {
      if (!id) console.log('[ERROR] room id is null')
      await roomDao.remove(id)
      window.location.reload()
    },
    // -=-=-=-=-=-=-=-= fetch event -=-=-=-=-=-=
    fetchTemplateList: async function() {
      const templateList = await tDao.list()
      this.templateList = templateList
    },
    fetchRoomList: async function() {
      const roomList = await roomDao.list()
      this.roomList = roomList
    }
  }
}
</script>
