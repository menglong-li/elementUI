import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import axios from './api'

if (process.env.VUE_APP_Mock) {    // 判断是否为mock模式
  require('../mock/mock.js');
}

Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
