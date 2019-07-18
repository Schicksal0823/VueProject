// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router/router'


//全局注册
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'https://api.bmob.cn';
axios.defaults.headers.common['X-Bmob-Application-Id'] = "c1ebecca0ccf003bd769bc567d0bc2e0";
axios.defaults.headers.common['X-Bmob-REST-API-Key'] = "d318d5a734c53cd26d5c5c2d44c258a9"
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.prototype.$bus = new Vue();

Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)      //vue2.0的写法
  // components: { App },  //vue1.0的写法
  // template: '<App/>'
})

