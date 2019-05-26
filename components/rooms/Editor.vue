<template>
  <div>
    <div class="editorWrapper">
      <EditorCore :on-change="onChangeEditorHandler" />
      <div class="buttonWrapper"><button @click="runCode">Run</button></div>
    </div>

    <div class="iframeWrapper">
      <iframe v-if="renderComponent" id="exframe" src="/executingFrame" />
    </div>
  </div>
</template>

<script>
import EditorCore from './EditorCore'

const sleep = s =>
  new Promise(resolve =>
    window.setTimeout(() => {
      return resolve()
    }, s * 1000)
  )

export default {
  components: { EditorCore },
  props: {},
  data: function() {
    return {
      renderComponent: true
    }
  },
  mounted: function() {},
  methods: {
    runCode: async function() {
      this.renderComponent = false
      await sleep(0.01)
      this.keypressMap = {}
      await sleep(1)
      this.renderComponent = true
      const { code } = this
      this.sendMessage(code)
    },
    sendMessage: function(msg) {
      const targetOrigin = window.location.origin
      document
        .getElementById('exframe')
        .contentWindow.postMessage(msg, targetOrigin)
    },
    onChangeEditorHandler: function(data) {
      console.log('onChangeEditorHandler -=-=-= data: ', data)
    }
  }
}
</script>

<style>
.codeEditor {
  height: 300px;
}

.editorWrapper {
  position: relative;
}
.buttonWrapper {
  position: absolute;
  bottom: 0;
  right: 0;
}
.buttonWrapper button {
  width: 120px;
  height: 40px;
  line-height: 33px;
  background-color: #f7df1f;
  color: black;
  font-size: medium;
  font-weight: 800;
  border: gray 1px solid;
}

.iframeWrapper iframe {
  border: none;
  border-top: black 1px solid;
  border-bottom: black 1px solid;
  width: 100%;
}
</style>
