<template>
  <div id="app">
    <router-view/>
    <Popup />
  </div>
</template>

<script>
import Popup from './components/popup/Popup';
export default {
  name: 'App',
  components: {
    Popup,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
