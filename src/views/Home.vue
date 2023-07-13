<template>
    <main>
        {{ console.log("listings data in home", this.listings) }}
        <Listings v-bind:listingsData="this.listings"/>
    </main>
</template>

<script>
    import Listings from "@/components/Listings"
    import { useSearchStore } from "@/stores/search"
    import { useUserStore } from "@/stores/user"

    export default{
        name: 'Home',
        components:{
            Listings,
        },
        data(){
            return{
                jwt:'',
                listings: [],
                searchStore: useSearchStore(),
                userStore: useUserStore()
            }
        },
        async created(){
            try{
                this.jwt = this.userStore.jwt;
            }
            catch(err){
                console.log(err)
            }
        
            await this.filterListings(this.searchStore);

            console.log(this.searchStore)
            console.log("user store", this.userStore.user)

            await this.searchStore.$subscribe(async (mutation, state) => {
                console.log("search state change")
                await this.filterListings(state)
            })
        
        },
        methods:{
            async getListings(){
                const res = await fetch("http://localhost:1337/api/listings?populate=images,category")
                
                const response = await res.json();

                return response.data;
            },
            async filterListings(state){
                const ls = await this.getListings();
                console.log("listings before filter: ", ls)

                this.listings = ls.filter( l => state === undefined || (l.attributes.title.includes(state.search) && 
                (state.category === '' || l.attributes.category.data.attributes.name === state.category)))

                console.log("listings after filter", this.listings)
            },
        },
    }
    
</script>

<style>

</style>