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
      renderComponent: true,
      editorCode: ''
    }
  },
  mounted: function() {},
  methods: {
    runCode: async function() {
      this.renderComponent = false
      await sleep(0.01)
      this.renderComponent = true
      this.keypressMap = {}
      await sleep(1)
      const { editorCode } = this
      this.sendMessage(editorCode)
    },
    sendMessage: function(msg) {
      console.log('msg: ', msg)
      const targetOrigin = window.location.origin
      document
        .getElementById('exframe')
        .contentWindow.postMessage(msg, targetOrigin)
    },
    onChangeEditorHandler: function(data = '') {
      this.editorCode = data
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
