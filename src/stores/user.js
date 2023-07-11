import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return { jwt:'',name:''
    }
  },
  actions: {
  },
  getters:{
        logged: (state) => !(state.jwt === null || state.jwt === '') 
    },
  persist: true
})