<template>
  <BSNavbar/>
  <router-view/>
</template>

<script>
import TopBar from "./components/Topbar.vue"
import BSNavbar from "./components/BSNavbar.vue";
import { useUserStore } from "./stores/user";
import { useSearchStore } from "./stores/search";


export default {
  name: 'App',
  components: {
    TopBar,
    BSNavbar
  },
  created(){
    //Gets data from local storage for saved user and search
    console.log("created")
    useSearchStore().initialise();
    useUserStore().initialise();
  }
}
</script>


<style>
  #app{
    font-family: Verdana, sans-serif;
  }
</style>
