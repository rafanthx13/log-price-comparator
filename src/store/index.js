import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const user = {
  state: {
    codeStatus: undefined,
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
    getResponse(state) {
      return state;
    }
  }
};

// Dessa forma podemos criar cada modulo separado ou em outros Arquivos
const store = new Vuex.Store({
  modules: {
    user: user,
    
  }
});

export default store;

/*

const roles = {
  state:{
    roles: []
  },
  mutations:{
    setRoles(state, listRoles){
      state.roles = listRoles;
    }
  },
  getters: {
    getRoles(state) {
      return state;
    }
  }
};

this.$store.commit("setRoles", this.tableData);

*/