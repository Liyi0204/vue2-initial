import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import axios from "axios"
import Antd from 'ant-design-vue'
// import ElementUI from "element-ui"
import Global from 'ASSETS/js/global.js' //全局封装方法

import 'ant-design-vue/dist/antd.css'
// import "element-ui/lib/theme-chalk/index.css"


Vue.config.productionTip = false
Vue.prototype.$global = Global;
Vue.prototype.$store = store;
Vue.use(Antd)
// Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
