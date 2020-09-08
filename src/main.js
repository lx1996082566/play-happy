import Vue from 'vue'
import router from './router'
import App from './App.vue'
import $http from './utils/http.js'
import $store from './store'
import './assets/common.css'
// import './assets/le.less'

Vue.prototype.$store = $store
Vue.prototype.$http = $http
new Vue({
  render: h => h(App),
  router
}).$mount('#app')


