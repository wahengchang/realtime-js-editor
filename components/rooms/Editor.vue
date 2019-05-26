<template>
  <div>
    <div class="editorWrapper">
      <prism-editor
        v-model="code"
        language="js"
        :line-numbers="true"
        class="codeEditor"
      />
      <div class="buttonWrapper"><button @click="runCode">Run</button></div>
    </div>

    <div class="iframeWrapper">
      <iframe v-if="renderComponent" id="exframe" src="/executingFrame" />
    </div>
  </div>
</template>

<script>
import 'prismjs'
import 'prismjs/themes/prism.css'
import PrismEditor from 'vue-prism-editor'
import 'vue-prism-editor/dist/VuePrismEditor.css'

const sleep = s =>
  new Promise(resolve =>
    window.setTimeout(() => {
      return resolve()
    }, s * 1000)
  )

export default {
  components: {
    PrismEditor
  },
  props: {
    code: {
      type: String,
      default: 'console.log("Default")'
    },
    onUpdateCodeHandler: {
      type: Function,
      default: null
    }
  },
  data: function() {
    return {
      renderComponent: true,
      isSave: false,
      keypressMap: {}
    }
  },
  mounted: function() {
    window.setInterval(this._onUpdateCodeHandler, 5000)
    const body = document.getElementsByTagName('body')[0]
    body.addEventListener('keyup', this.onKeyUpHandler)
    body.addEventListener('keydown', this.onKeyDownHandler)
  },
  methods: {
    runCode: async function() {
      this.keypressMap = {}
      this.renderComponent = false
      await sleep(0.1)
      this.renderComponent = true
      await sleep(1)
      const { code } = this
      this.sendMessage(code)
      this.onUpdateCodeHandler(code)
    },
    onKeyUpHandler: function(e) {
      this.keypressMap[e.code] = false
    },
    onKeyDownHandler: function(e) {
      this.keypressMap[e.code] = true

      if (this.keypressMap.MetaLeft && this.keypressMap.Enter) {
        return this.runCode()
      }
      if (this.keypressMap.MetaLeft && this.keypressMap.KeyS) {
        return this.runCode()
      }
    },
    sendMessage: function(msg) {
      const targetOrigin = window.location.origin
      document
        .getElementById('exframe')
        .contentWindow.postMessage(msg, targetOrigin)
    },
    _onUpdateCodeHandler: function() {
      return this.onUpdateCodeHandler(this.code)
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
