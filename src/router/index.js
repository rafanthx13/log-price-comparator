import Vue from 'vue'
import VueRouter from 'vue-router'

// Components to Router
import Home from '../components/Home'
import AboutMe from '../components/AboutMe'
import SearchMain from '../components/Search/SearchMain.vue';


import InsertMain from '../components/Insert/InsertMain.vue';
import InsertProduct from '@/components/Insert/InsertProduct.vue';
import InsertCity from '@/components/Insert/InsertCity.vue';
import InsertShop from '@/components/Insert/InsertShop.vue';
import InsertLog from '@/components/Log/InsertLog.vue';


Vue.use(VueRouter)

/* Observações
+ Children é usado para fazer um router dentro de outro, se for mudar totalmente, ENTAO, de pagina nao use children
  - Tentei fazer e só deu problema
*/

export default new VueRouter ({
  mode: 'history',
  routes: [
    { path: '/', name: "Home", component: Home },
    { path: '/aboutme', name: "About Me", component: AboutMe},
    { path: '/insert', name: 'Insert Main', component: InsertMain},
    { path: '/insert/city', name: 'Insert City', component: InsertCity},
    { path: '/insert/shop', name: 'Insert Shop', component: InsertShop},
    { path: '/insert/product', name: 'Insert Product', component: InsertProduct},
    { path: '/search', name: "Search", component: SearchMain },
    { path: '/log', name: 'Log', component: InsertLog}
  ]

})

