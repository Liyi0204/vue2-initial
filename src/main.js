import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import WsBase from "./components/index"
import Antd from 'ant-design-vue'
import ElementUI from "./element/index"
import Global from 'ASSETS/js/global.js' //全局变量、方法

import 'ant-design-vue/dist/antd.less'
import 'ASSETS/css/config.less'
Vue.config.productionTip = false
Vue.prototype.$global = Global;
Vue.prototype.$store = store;
Vue.use(Antd)
Vue.use(WsBase)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
