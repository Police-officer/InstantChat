import Vue from 'vue'
import App from './App'
import router from './router/index'
import Vuetify from 'vuetify'
import config from './config'
import MyComponent from './components/MyComponent'
import './http';
import 'vuetify/dist/vuetify.min.css'
import qs from 'qs'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/material.css'

Vue.use(Vuetify, {theme: config.theme})
Vue.use(MyComponent)
Vue.use(ElementUI)
Vue.prototype.$qs = qs;
Vue.config.productionTip = false;

Vue.prototype.verify = function () {
  return this.$http.get("/auth/verify")
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
