import Vue from 'vue'
import VueRouter from 'vue-router'

// Components to Router
import Home from '../components/Home'
import AboutMe from '../components/AboutMe'
import InsertMain from '../components/Insert/InsertMain.vue';
import SearchMain from '../components/Search/SearchMain.vue';

Vue.use(VueRouter)

export default new VueRouter ({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/aboutme', component: AboutMe},
    { path: '/insert', component: InsertMain },
    { path: '/search', component: SearchMain },
  ]

})

