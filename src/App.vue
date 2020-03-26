<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <router-view/> -->
   <div class="flex">
      <Home  class="f1" />
      <About class="f1" />
   </div>
  </div>
</template>


<script>
import Home from './views/Home'
import About from './views/About'
export default {
  components:{
    Home,
About
  }
}
</script>

<style>
.f1{
  /* flex: 1; */
  width: 50%;
  margin: 0 auto;
}
.flex{
  display: flex;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
