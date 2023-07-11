import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => {
    return { 
      search:'',
      category:''
    }
  },
  actions: {
  },
  getters:{
        
    },
  persist: true
})