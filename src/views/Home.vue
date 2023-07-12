<template>
    <main>
        <Listings v-bind:listingsData="this.listings"/>
    </main>
</template>

<script>
    import Listings from "@/components/Listings"
    import { useUserStore } from "@/stores/user"
    import { useSearchStore } from "@/stores/search"

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
            this.filterListings(this.searchStore)

            await this.searchStore.$subscribe(async (mutation, state) => {
                this.filterListings(state)
            })
        },
        methods:{
            async getListings(){
                const res = await fetch("http://localhost:1337/api/listings?populate=images,category")
                
                const response = await res.json();

                console.log(response)

                return response.data;
            },
            async filterListings(state){
                const ls = await this.getListings();

                console.log(ls[0].attributes.category)

                this.listings = ls.filter( l => l.attributes.title.includes(state.search) && 
                (state.category === '' || l.attributes.category.data.attributes.name === state.category))
            }
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

</style>