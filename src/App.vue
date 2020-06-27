<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body{margin: 0px;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.search-add{ margin-bottom: 20px;}
.globalForm{width: 60%;}
.inputNumber{ width: 200px!important;}
@media screen and (max-width: 736px) {
  .globalForm{width: 100%;}
}
</style>
