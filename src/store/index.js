import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// Deicidir aonde é
let URL; // BackEnd
if(window.location.hostname == 'localhost'){
  // local
  URL = 'http://localhost:3000';
} else { 
  // production
  URL = 'https://price-log-server.herokuapp.com'
}

// Exemplo de Vuex nos componentes Vue
// getters: this.$store.getters.getRoutes.login.login
// mutations: this.$store.commit("setCodeStatus", newCodeStatus);
const user = {
  state: {
    codeStatus: 100,
    errorMessage: undefined
  },
  mutations: {
    setCodeStatus(state, codeStatus) {
      state.codeStatus = codeStatus;
    },
    setErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    }
  },
  actions: {},
  getters: {
    getUser(state) {
      return state;
    }
  }
};

const routes = {
  state: {
    URL: URL,
    city: {
      post: URL + '/city',
      getAll: URL +  '/city',
      getCities: URL + '/city/city'
    },
    log: {
      post: URL + '/log',
      getAll: URL +  '/log',
      getPosted: URL + '/log/get'
    },
    login: {
      login: URL + '/login',
      register: URL +  '/register',
      auth: URL + '/auth'
    },
    product: {
      getAll: URL + '/product',
      post: URL + '/product',
      getProductsNames: URL + '/product/name'
    },
    shop: {
      post: URL + '/shop',
      getAll: URL + '/shop',
      getShopsNames: URL + '/shop/name',
      getShopsByCity: URL + '/shop/city?city_name='
    }
  },
  mutations: {},
  actions: {},
  getters: {
    getRoutes(state) {
      return state;
    }
  }

};

// const routes = {
//   state: {
//     user: {
//       login: localStorage.getItem("URL") + "/auth/login",
//       me: localStorage.getItem("URL") + "/users/me",
//       post: localStorage.getItem("URL") + "/users",
//       getOne: localStorage.getItem("URL") + "/users/findOne/",
//       put: localStorage.getItem("URL") + "/users/me",
//       get: localStorage.getItem("URL") + "/users",
//       delete: localStorage.getItem("URL") + "/users",
//       enableAndDisable: localStorage.getItem("URL") + "/users/enableAndDisable",
//       edit: localStorage.getItem("URL") + "/users",
//       changePassword: localStorage.getItem("URL") + "/users/changePassword",
//       image: localStorage.getItem("URL") + "/users/uploadFiles/",
//       getPaginated: localStorage.getItem("URL") + "/users/pages",
//       getPaginatedUsers: localStorage.getItem("URL") + "/users/pagesUsers/",
//       profiles: localStorage.getItem("URL") + "/profiles",
//       getPaginatedProfile: localStorage.getItem("URL") + "/profiles/pages/",
//       getPaginatedProfiles: localStorage.getItem("URL") + "/profiles/search/",
//       roles: localStorage.getItem("URL") + "/roles",
//       getPaginatedRole: localStorage.getItem("URL") + "/roles/pages/",
//       getPaginatedRoles: localStorage.getItem("URL") + "/roles/search/",
//       activate: localStorage.getItem("URL") + "/users/editActivate/"
//     }, 
//     profiles: {
//       get: localStorage.getItem("URL") + "/profiles",
//     }
//   },
//   mutations: {},
//   actions: {},
//   getters: {
//     getRoutes(state) {
//       return state;
//     }
//   }
// };



// const backend = {
//   state: {

//     URL: localStorage.getItem("URL"),
//     production: "http://172.23.18.248:8088",
//     sandbox: "http://172.23.18.248:8088",
//     development: "http://172.23.18.248:8090",
//     token: localStorage.getItem("token"),
//     frontDev: "172.23.18.248:8089",
//     frontSandbox: "172.23.18.248:8087",
//     local: "http://172.23.18.248:8090"
//     // local: "http://localhost:6464",
//   },
//   mutations: {
//     setBackend(state, URL) {
//       localStorage.setItem("URL", URL);
//       state.URL = URL;
//       routes.state.user.login = URL + "/auth/login";
//       routes.state.user.me = URL + "/users/me";
//       routes.state.user.post = URL + "/users";
//       routes.state.user.put = URL + "/users/me";
//       routes.state.user.get = URL + "/users";
//       routes.state.user.delete = URL + "/users";
//       routes.state.user.edit = URL + "/users";
//       routes.state.user.getOne = URL + "/users/findOne/";
//       routes.state.user.getPaginated = URL + "/users/pages";
//       routes.state.user.image = URL + "/users/uploadFiles/";
//       routes.state.user.profiles = URL + "/profiles";
//       routes.state.user.roles = URL + "/roles";
//     },
//     setToken(state, token) {
//       localStorage.setItem("token", token);
//       state.token = token;
//     }
//   },
//   actions: {},
//   getters: {
//     getBackend(state) {
//       return state;
//     }
//   }
// };

// const routes = {
//   state: {

//   }
// }

// let URL = window.location.hostname + ":" + window.location.port;
//   window.location.hostname === "localhost" ?
//       store.commit("setBackend", store.getters.getBackend.local) :
//   URL === store.getters.getBackend.frontDev ?
//       store.commit(
//         "setBackend",
//         store.getters.getBackend.development
//       ) :
//   URL === store.getters.getBackend.frontSandbox ?
//       store.commit("setBackend", store.getters.getBackend.sandbox) :
//       store.commit(
//         "setBackend",
//         store.getters.getBackend.development
//       );

// const api = {
//   state: {
//     codeStatus: 100,
//     errorMessage: undefined
//   },
//   mutations: {
//     setCodeStatus(state, codeStatus) {
//       state.codeStatus = codeStatus;
//     },
//     setErrorMessage(state, errorMessage) {
//       state.errorMessage = errorMessage;
//     }
//   },
//   actions: {},
//   getters: {
//     getUser(state) {
//       return state;
//     }
//   }
// };

// Dessa forma podemos criar cada modulo separado ou em outros Arquivos
const store = new Vuex.Store({
  modules: {
    user: user,
    routes: routes
    
  }
});

export default store;

