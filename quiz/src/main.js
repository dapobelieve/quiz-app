import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false;

// if (window.location.hostname === 'localhost') {
    // Vue.prototype.$baseUrl = 'http://localhost:5000/api/v1/';
// }
Vue.prototype.$baseUrl = 'https://dapo-quiz-api.herokuapp.com/api/v1/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
