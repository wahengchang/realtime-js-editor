<template>
  <div>
    <header>
      <div class="headerRow">
        <h1>
          <a href="/">
            Share JS
          </a>
        </h1>
        <span>
          Interview purpose, online instant real-time JavaScript code editor.
        </span>
      </div>
    </header>
    <loading :active.sync="isLoading" :is-full-page="true" />
    <nuxt />
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  components: { Loading },
  computed: {
    isLoading: function() {
      return this.$store.state.system.isLoading
    }
  }
}
</script>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

header {
  height: 80px;
  background-color: #f7df1f;

  .headerRow {
    padding-top: 5px;
    padding-left: 5px;

    a {
      text-decoration: none;
      color: black;
    }
  }
}
</style>
