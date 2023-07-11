<template>
  <BSNavbar/>
  <router-view/>
</template>

<script>
import TopBar from "./components/Topbar.vue"
import BSNavbar from "./components/BSNavbar.vue";

export default {
  name: 'App',
  components: {
    TopBar,
    BSNavbar
},
}
</script>


<style>
  #app{
    font-family: Verdana, sans-serif;
  }
</style>
