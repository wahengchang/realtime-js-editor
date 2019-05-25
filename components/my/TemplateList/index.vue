<template>
  <div>
    <ul>
      <li v-for="(item, index) of dataList" :key="index">
        {{ item }}
        <button @click="onClickRemove(item.id)">remove</button>
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
