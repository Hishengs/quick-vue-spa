import Vue from "vue";
import Router from "vue-router";
// pages
import home from './page/home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  routes: [
    { path:'/', name: 'index', redirect: '/home' },  // root
    { path:'/home', name: 'home', component: home }, // home
  ]
});

export default router;
