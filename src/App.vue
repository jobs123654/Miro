<template>
<div id="app">
<router-view></router-view>

  </div>
</template>

<script>
let {clientHeight}=document.documentElement.clientHeight
import Login from './components/Login'
import Index from './components/Index'
export default {
  name: 'App',
  components: {
    Login,Index
  },
}
</script>

<style>
body{
	background: url(./assets/bg.png)  repeat;
	background-size:cover;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  /* margin-top: 60px; */
}


</style>
