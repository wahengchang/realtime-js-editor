<template>
  <div class="editor">
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import { Editor, EditorContent } from 'tiptap'
import {
  Code,
  CodeBlock,
  CodeBlockHighlight,
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
  props: {
    onChange: {
      type: Function,
      default: null
    }
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
      this.$store.commit('system/setIsLoading', false)
      if (this.editor) {
        this.editor.destroy()
      }
      this.editor = this.initEditor(data)
      this._onChange(this.editor)
    },
    _onChange(e) {
      const json = e.getJSON()
      const result = json.content[0].content[0].text || ''
      this.onChange(result)
    },
    initEditor(data) {
      const { doc = '', version = 1 } = data
      return new Editor({
        content: JSON.parse(doc),
        onUpdate: this._onChange,
        extensions: [
          new Code(),
          new CodeBlock(),
          new CodeBlockHighlight({
            languages: {
              javascript,
              css
            }
          }),
          new Collaboration({
            version,
            debounce: 1000,
            onSendable: this.onSendable(data)
          })
        ]
      })
    },
    onSendable(originData, cb) {
      return payload => {
        const { sendable } = payload
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
          roomrDao
            .updateById(id, {
              version: newVersion,
              doc: JSON.stringify(doc)
            })
            .then(() => this.editor.focus())
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

pre {
  &::before {
    content: attr(data-language);
    text-transform: uppercase;
    display: block;
    text-align: right;
    font-weight: bold;
    font-size: 0.6rem;
  }
  code {
    .hljs-comment,
    .hljs-quote {
      color: #999999;
    }
    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f2777a;
    }
    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #f99157;
    }
    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #99cc99;
    }
    .hljs-title,
    .hljs-section {
      color: #ffcc66;
    }
    .hljs-keyword,
    .hljs-selector-tag {
      color: #6699cc;
    }
    .hljs-emphasis {
      font-style: italic;
    }
    .hljs-strong {
      font-weight: 700;
    }
  }
}
</style>
