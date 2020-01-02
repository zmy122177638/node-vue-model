import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/js/rem.js";
import "./assets/styles/base.css";
import "./registerServiceWorker";
import { Toast } from "vant";
Vue.use(Toast);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
