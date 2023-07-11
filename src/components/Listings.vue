<template>
    <div class="listings">
        <ListingPreview v-for="l in this.listingsData" v-bind:listing="l"/>
    </div>
</template>

<script>
    import ListingPreview from "@/components/ListingPreview.vue";
    import { RouterLink } from "vue-router";
    
    export default{
        name: "Listings",
        props:{
            listingsData: Array,
        },
        components:{
            ListingPreview,
            RouterLink
        }
    }
</script>

<style scoped>
    .listings{
        width: 80%;
        margin: auto;

        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
    
        margin-bottom: 200px;
    }
</style>