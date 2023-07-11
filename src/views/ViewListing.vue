<template>
    {{ console.log(this.listing) }}
</template>

<script>
    import { useRoute } from 'vue-router';

    export default{
        name: "ViewListing",
        data(){
            return{
                listing:Object
            }
        },
        created(){
            const route = useRoute();
            this.listing = route.params.listing;
            console.log(this.listing) 
        }
    }
</script>

<style>

</style>