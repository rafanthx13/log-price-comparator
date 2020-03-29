import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import router from './router'
import VueSwal from 'vue-swal'
import Notifications from 'vue-notification'
Vue.use(Notifications)

// import Axios from 'axios'
// Vue.prototype.$http = Axios;
// const token = localStorage.getItem('token')
// if (token) {
//   Vue.prototype.$http.defaults.headers.common['Authorization'] = token
// }

Vue.use(VueSwal)

import VueApexCharts from "vue-apexcharts";
Vue.component("apexchart", VueApexCharts);

// import axios from 'axios'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')