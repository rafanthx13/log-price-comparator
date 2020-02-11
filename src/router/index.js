import Vue from 'vue'
import VueRouter from 'vue-router'

// Components to Router
import Home from '../components/Home'
import AboutMe from '../components/AboutMe'

Vue.use(VueRouter)

export default new VueRouter ({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/aboutme', component: AboutMe},
  ]

})

