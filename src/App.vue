<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    'app-header': Header,
    'app-footer': Footer
  }
}
</script>

<style>

html{
  height: 100%;
  box-sizing: border-box;
}
body{
  position: relative;
  margin: 0;
  height: 100%;
}
#app{
  padding-bottom: 140px;
  position: relative;
  min-height: 100%;
}
</style>
