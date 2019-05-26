<template>
  <div class="editor">
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import {
  HardBreak,
  Heading,
  Bold,
  Code,
  Italic,
  History,
  Collaboration
} from 'tiptap-extensions'
import { Step } from 'prosemirror-transform'

import RoomRDao from '~/utils/rDao/Room'
const roomrDao = new RoomRDao()
const { schema } = RoomRDao

export default {
  name: 'EditorCore',
  components: {
    EditorContent
  },
  data() {
    return {
      editor: null,
      socket: null,
      count: 0
    }
  },
  mounted() {
    this.$store.commit('system/setIsLoading', true)
    const { id } = this.$route.params
    roomrDao.onById(id, this.onInit)
  },
  beforeDestroy() {
    this.editor.destroy()
    this.socket.destroy()
  },
  methods: {
    onInit(data) {
      const { doc = '', version = 1 } = data
      this.$store.commit('system/setIsLoading', false)
      if (this.editor) {
        this.editor.destroy()
      }
      this.editor = new Editor({
        content: JSON.parse(doc),
        extensions: [
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new Bold(),
          new Code(),
          new Italic(),
          new History(),
          new Collaboration({
            version,
            debounce: 500,
            onSendable: this.onSendable(data)
          })
        ]
      })
    },
    onSendable(originData) {
      return ({ sendable }) => {
        const { id } = this.$route.params
        const { version, steps, clientID } = sendable
        if (originData.version !== version) {
          return roomrDao.updateById(id, sendable)
        } else {
          let doc = schema.nodeFromJSON(JSON.parse(originData.doc))
          const newSteps = steps.map(step => {
            const newStepItem = Step.fromJSON(schema, step)
            newStepItem.clientID = clientID
            const result = newStepItem.apply(doc)
            doc = result.doc
            return newStepItem
          })
          const newVersion = version + newSteps.length
          return roomrDao.updateById(id, {
            version: newVersion,
            doc: JSON.stringify(doc)
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
.editor__content {
  height: 300px;
}
</style>
