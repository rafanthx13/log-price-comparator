// Decide DEV/PROD
let URL; // BackEnd
if(window.location.hostname == 'localhost'){
  // local
  URL = 'http://localhost:3000';
} else { 
  // production
  URL = 'https://price-log-server.herokuapp.com'
}

const version = {
  state: {
    version: "v1.0.5"
  },
  mutations: {},
  actions: {},
  getters: {
    getVersion(state){
      return state;
    }
  }
};

const user = {
  state: {
    user_name: '',
    user_type: ''
  },
  mutations: {
    setUser(state, user) {
      state.user_name = user.user_name;
      state.user_type = user.user_type;
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
      put: URL + '/city/',
      delete: URL + '/city/',
      getAll: URL + '/city',
      getCities: URL + '/city/city'
    },
    log: {
      post: URL + '/log',
      put: URL + '/log/',
      delete: URL + '/log/',
      getAll: URL + '/log',
      getToSearch: URL + '/log/search'
    },
    login: {
      login: URL + '/login',
      register: URL + '/user',
      auth: URL + '/auth'
    },
    product: {
      getAll: URL + '/product',
      put: URL + '/product/',
      delete: URL + '/product/',
      post: URL + '/product',
      getProductsNames: URL + '/product/name'
    },
    shop: {
      post: URL + '/shop',
      put: URL + '/shop/',
      delete: URL + '/shop/',
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

export default { user, routes, version };

/* EXAMPLE OF SIMPLE VUEX USE:
  => CALL getters: this.$store.getters.getUser.codeStatus
  => CALL mutations: this.$store.commit("setCodeStatus", newCodeStatus);
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
*/
