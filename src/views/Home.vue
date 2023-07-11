<template>
    <Listings v-bind:listingsData="this.listings"/>
    {{ console.log(this.jwt === undefined || this.jwt === '' ? "Not logged" : "Logged")  }}
</template>

<script>
    import Listings from "@/components/Listings"
    import { useUserStore } from "@/stores/user"
    import { useSearchStore } from "@/stores/search"
    import { storeToRefs } from "pinia"

    export default{
        name: 'Home',
        components:{
            Listings,
        },
        data(){
            return{
                jwt:'',
                listings: [],
                searchStore: useSearchStore()
            }
        },
        async created(){
            this.listings = await this.getListings();

            await this.searchStore.$subscribe(async (mutation, state) => {
                console.log('user searched something')
                console.log(mutation, state)
                
                const ls = await this.getListings();

                console.log(ls)

                this.listings = ls.filter( l => l.title.includes(state.search))
                
                console.log(state.search)
            })
        },
        methods:{
            async getListings(){
                const res = await fetch("http://localhost:1337/api/listings?populate=images")
                
                const response = await res.json();

                return response.data;
            },
        },
        mounted() {
            try{
                const userStore = useUserStore();

                this.jwt = userStore.jwt;
            }
            catch(err){
                
            }
        },
    }
    
</script>

<style>
.mainDiv{
    position: relative;
}
</style>