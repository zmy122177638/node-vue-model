import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './common/js/rem.js';
import './common/css/base.css';
import './registerServiceWorker';
import { Toast } from "vant";
Vue.use(Toast);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
