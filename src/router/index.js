import {createRouter, createWebHistory} from 'vue-router'

import Home from '@/views/Home.vue'
import Signup from '@/views/Signup.vue'
import Login from '@/views/Login.vue'
import ViewListing from '@/views/ViewListing'

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/viewListing',
    name: 'viewListing',
    component: ViewListing
  }
  ];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), routes
})

export default router