<template>
  <div>
    <ul>
      <li v-for="(item, index) of dataList" :key="index">
        <div class="roomListRow">
          <nuxt-link class="roomListButton" :to="`/rooms/${item.id}`">{{
            item
          }}</nuxt-link>
          <button @click="onClickRemove(item.id)">remove</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TemplateList',
  props: {
    dataList: {
      type: Array,
      default: () => []
    },
    onClickRemove: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}
.roomListRow {
  margin: 20px 0;
  display: flex;
  background-color: #eeeeee;
  padding: 20px 0;
}
.roomListButton {
  display: block;
  min-width: 400px;
  width: 80%;
}
</style>
