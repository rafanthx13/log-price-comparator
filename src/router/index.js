import Vue from 'vue'
import VueRouter from 'vue-router'

import AuthAPI from '../api/Login'

// Components to Router
import MainLayout from '../components/Layout/MainLayout.vue'

import Login from '../components/Login/Login.vue'
import Register from '../components/Login/Register.vue'

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
// Vai funcionar com o children pois o children é usado quando se tem router-vrei detrno de router-view
// Assim, "Login nâo tem o latout de MainLayout"

let router = new VueRouter ({
  mode: 'history',
  // linkActiveClass: 'active', // mudei aki
  routes: [
    { path: '/app/', component: MainLayout, redirect: '/home', children: 
      [
        { path: '/home', name: "Home", component: Home },
        { path: '/aboutme', name: "About Me", component: AboutMe},
        { path: '/insert', name: 'Insert Main', component: InsertMain},
        { path: '/insert/city', name: 'Insert City', component: InsertCity},
        { path: '/insert/shop', name: 'Insert Shop', component: InsertShop},
        { path: '/insert/product', name: 'Insert Product', component: InsertProduct},
        { path: '/search', name: "Search", component: SearchMain },
        { path: '/log', name: 'Log', component: InsertLog}
        
      ],
      meta: { 
        requiresAuth: true
      },
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,

    }
  ]

});

// Regula aonde vai executar algo antes de entrar
router.beforeEach((to, from, next) => {

  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') === null){
      next({ name: 'Login', params: { auth: 'false' }});
    } else {
      AuthAPI.auth(localStorage.getItem('token')).then( () => {
        next()  
      })
      .catch( () => {
        if(to.name == 'Login'){
          next(false) // abort
        } else {
          next({ name: 'Login', params: { auth: 'false' }});  
        }
      })   
    }
  } else {
    next();  
  }

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

export default router