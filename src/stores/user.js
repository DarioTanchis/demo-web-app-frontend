import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return { 
      jwt:'', 
      user: Object
    }
  },
  actions: {
  },
  getters:{
      
  },
  persist: {
    storage: sessionStorage,
    paths: ['jwt', 'user'],
  } 
})