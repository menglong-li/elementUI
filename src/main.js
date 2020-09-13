import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import axios from './api'
import store from './store/store.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
/*editor */
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor);
/**End:editor */

if (process.env.VUE_APP_Mock == true) {    // 判断是否为mock模式
  require('../mock/mock.js');
}

Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
