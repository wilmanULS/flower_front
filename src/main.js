import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import ObjectsPlugin from './plugins/Objects';
Vue.config.productionTip = false
Vue.use(ObjectsPlugin);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
    