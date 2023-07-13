import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core';
import { watch } from 'vue';

export const useUserStore = defineStore('user', {
  state: () => {
    return { 
        jwt: '',
        user: Object
    }
  },
  actions:{
    initialise(){
      const storage = useStorage('user-store',{ jwt:'', user:Object },localStorage,{ mergeDefaults: true })


      let data = JSON.parse(localStorage.getItem("user-store"))

      this.user = data.user;
      this.jwt = data.jwt;
      
      //console.log(JSON.parse(data))
      
      //this.user = JSON.parse(localStorage.getItem("user-store"));
    },
    setUser(jwt, user){
      this.jwt = jwt;
      this.user = user;

      localStorage.setItem('user-store', JSON.stringify({ jwt:jwt, user:this.user }) )
    }
  }
})