import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import router from './router'

import VueSwal from 'vue-swal'
Vue.use(VueSwal)

import Notifications from 'vue-notification'
Vue.use(Notifications)

import VueApexCharts from "vue-apexcharts";
Vue.component("apexchart", VueApexCharts);

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')