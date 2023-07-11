<template>
    <div @click="viewListing" class="listing">
        <img class="thumbnail" v-if="this.listing.attributes.images === undefined || this.listing.attributes.images.data === null" 
        src="https://www.vectorstock.com/royalty-free-vectors/default-vectors" >
        <img class="thumbnail" v-else :src="'http://localhost:1337' + this.listing.attributes.images.data[0].attributes.url" 
        alt="https://www.vectorstock.com/royalty-free-vectors/default-vectors"> 
        
        <h2>{{ this.listing.attributes.title }}</h2>
        <p>{{ this.listing.attributes.price === 0 ? "Gratis": this.listing.attributes.price }}</p>    
    </div>
</template>

<script>
    export default{
        name: "ListingPreview",
        props:{
            listing:Object
        },
        methods:{
            viewListing(e){
                e.preventDefault();

                this.$router.push({name: "viewListing", params:{ "listing":this.listing }})
            }
        }
    }
</script>

<style>
    .listing{
        display: flex;
        flex-direction: column;
        padding: 20px;

        width: 300px;
        height: 300px;

        margin: 15px;
        margin-top: 30px;
        border-radius: 15px;

        box-shadow: lightgray 1px 1px 3px 2px;
    }

    .listing > *{
        padding: 3px;
        text-align: center;

        margin: 5px;
        margin-top: 15px;
    }

    .thumbnail{
        max-height: 150px;
        width: auto;
        
        border-radius: 10px;

        margin: auto;
    }
</style>