import Vue from 'vue'
import VueRouter from 'vue-router'

// Components to Router
import MainLayout from '../components/Layout/MainLayout.vue'

import Login from '../components/Login/Login.vue'

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

// TODO: REGISTRA: EM 16/03 eu usarei 2 router-view, para que possa ter uma tela sem o Layout Oirignal, como intranet
//  Vai funcionar com o children pois o children é usado quando se tem router-vrei detrno de router-view
// Assim, "Login nâo tem o latout de MainLayout"

export default new VueRouter ({
  mode: 'history',
  // linkActiveClass: 'active',
  routes: [
    { path: '/app/', component: MainLayout, redirect: '/app/home', children: 
      [
        { path: '/home', name: "Home", component: Home },
        { path: '/aboutme', name: "About Me", component: AboutMe},
        { path: '/insert', name: 'Insert Main', component: InsertMain},
        { path: '/insert/city', name: 'Insert City', component: InsertCity},
        { path: '/insert/shop', name: 'Insert Shop', component: InsertShop},
        { path: '/insert/product', name: 'Insert Product', component: InsertProduct},
        { path: '/search', name: "Search", component: SearchMain },
        { path: '/log', name: 'Log', component: InsertLog}
        
      ]
    },
    {
      path: '/',
      redirect: '/app'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,

    }
    // { path: '/home', name: "Home", component: Home },
    // { path: '/aboutme', name: "About Me", component: AboutMe},
    // { path: '/insert', name: 'Insert Main', component: InsertMain},
    // { path: '/insert/city', name: 'Insert City', component: InsertCity},
    // { path: '/insert/shop', name: 'Insert Shop', component: InsertShop},
    // { path: '/insert/product', name: 'Insert Product', component: InsertProduct},
    // { path: '/search', name: "Search", component: SearchMain },
    // { path: '/log', name: 'Log', component: InsertLog}
  ]

})


/*

let profileMenu = {
  path: '/profile',
  component: DashboardLayout,
  redirect: '/profile/edit',
  children: [
    {
      path: 'edit',
      name: 'Buttons',
      component: Buttons
    },
    {
      path: 'list-profile',
      name: 'Gerenciar Perfis dos Usuários',
      component: ListProfiles
    },
    {
      path: 'list-roles',
      name: 'Listar Permissões',
      component: RoleProfiles
    },
    {
      path: 'grid-system',
      name: 'Grid System',
      component: GridSystem
    },
    {
      path: 'panels',
      name: 'Panels',
      component: Panels
    },
    {
      path: 'sweet-alert',
      name: 'Sweet Alert',
      component: SweetAlert
    },
    {
      path: 'notifications',
      name: 'Notifications',
      component: Notifications
    },
    {
      path: 'icons',
      name: 'Icons',
      component: Icons
    },
    {
      path: 'typography',
      name: 'Typography',
      component: Typography
    }

  ]
};
*/

