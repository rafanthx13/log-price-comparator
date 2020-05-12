import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import 'vuetify/dist/vuetify.min.css';
// import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default new Vuetify({
  iconfont: 'mdi', 
  icons: {
    iconfont: 'mdi'
  },
});

// Vue.use(Vuetify, {
//   iconfont: 'mdi', 
//   icons: {
//     iconfont: 'mdi'
//   },
// });

/* 100% Original

import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  iconfont: 'mdi', 
  icons: {
    iconfont: 'mdi'
  },
});

*/