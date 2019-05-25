<template>
  <div>
    <div id="logger"></div>
  </div>
</template>

<script>
/* eslint-disable no-eval */
const initConsole = () => {
  // const old = console.log
  const logger = document.getElementById('logger')
  console.log = function(message) {
    if (typeof message === 'object') {
      logger.innerHTML +=
        (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />'
    } else {
      logger.innerHTML += message + '<br />'
    }
  }
}
export default {
  layout: 'none',
  mounted: function() {
    initConsole()
    window.addEventListener('message', this.receiveMessage, false)

    setInterval(() => {
      this.scrollToBottom()
    }, 1000)
  },
  methods: {
    receiveMessage: function(event) {
      if (event.origin !== window.location.origin) {
        return console.log('[ERROR] dangerour event origin')
      }
      eval(event.data)
    },
    scrollToBottom: function() {
      window.scrollTo(0, document.getElementById('logger').scrollHeight)
    }
  }
}
</script>

<style>
html {
  scroll-behavior: smooth;
}
body {
  background-color: black;
  color: white;
}
</style>
