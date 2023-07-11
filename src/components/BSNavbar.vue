<template>
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
        <!--<a class="navbar-brand">Navbar</a>-->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" @click="goToHome">Home<span v-if="this.isHome" class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" @click="goToLogin">Accedi<span v-if="this.isLogin" class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" @click="goToSignup">Registrati<span v-if="this.isSignup" class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ this.category === '' ? 'Seleziona categoria' : this.category }}
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li v-for="c in this.categories"><a class="dropdown-item" @click="CategoryFilter($event, c.attributes.name)">{{ c.attributes.name }}</a></li>
                    <li v-if="this.category !== ''"><a class="dropdown-item" @click="CategoryFilter($event, '')"> Nessun categoria</a></li>
                </ul>
            </li>
            <li v-if="this.userStore.logged" class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ userStore.name }}
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" @click="logout">Logout</a></li>
                </ul>
            </li>
            </ul>
            <form v-if="isHome" class="form-inline my-2 my-lg-0 search">
            <span><input v-model="searchString" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></span>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="this.Search">Cerca</button>
            </form>
        </div>
    </nav>
</template>

<script>
    import router from '@/router';
    import { useUserStore } from "@/stores/user";
    import { useSearchStore } from '@/stores/search';

    export default{
        name:"BSNavbar",
        data(){
            return{
                categories: Array,
                userStore: Object,
                isHome: Boolean,
                isLogin: Boolean,
                isSignup: Boolean,
                searchString:'',
                category:'',
                searchStore:''
            }
        },
        props:{
        },
        watch: {
            '$route': function (from, to) {
                console.log("new route set");

                this.isHome = this.$route.name === 'home';
                this.isLogin = this.$route.name === 'login';
                this.isSignup = this.$route.name === 'signup';
            }   
        },
        async created(){
            this.categories = await this.fetchCategories();
            
            this.userStore = useUserStore();
            this.searchStore = useSearchStore();

            this.searchString = this.searchStore.search;
            this.category = this.searchStore.category;
        },
        methods:{
            async fetchCategories(){
                const res = await fetch("http://localhost:1337/api/categories")

                const data = await res.json();

                console.log(data);

                return data.data;
            },
            goToLogin(e){
                e.preventDefault();

                router.push({name:'login'});
            },
            goToSignup(e){
                e.preventDefault();
                
                router.push({name:'signup'})

                console.log("go to signup")
            },
            goToHome(e){
                e.preventDefault();
                
                router.push({name:'home'})

                console.log("go to home")
            },
            logout(e){
                e.preventDefault();

                this.userStore.$patch({jwt:'',name:''})
            },
            Search(e){
                e.preventDefault();

                const searchStore = useSearchStore();

                searchStore.$patch({ search:this.searchString });
            },
            CategoryFilter(e, cat){
                e.preventDefault();

                this.category = cat

                const searchStore = useSearchStore();

                searchStore.$patch({ category:cat });
            }
        },
    }
</script>

<style>
    .search{
        display: flex;
        flex-direction: row;
        position: absolute;
        right: 0;
        margin-right: 20px;
    }

    .search > * {
        margin-right: 10px;
    }
</style>