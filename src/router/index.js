import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/vuex/store'; //全局仓储
import SomRoute from "./som-route";
import loginService from "API/foundation/loginService";

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'index',
  meta: {
    title: '首页',
  },
  component: () => import('PAGES/index.vue'),
  //无页面加载用户信息，特殊处理
  beforeEnter: async (to, from, next) => {
    let data = await loginService.checkLoginThenGetUserInfo();
    if (data != undefined) {
      store.commit("setUserInfo", data);
      next();
    } else {
      Vue.prototype.$message({
        message: '无用户信息或登录权限，将前往认证中心',
        type: 'error'
      })
      setTimeout(() => {
        loginService.doLogout().then(data => {
          window.location.reload()
        })
      }, 2000);
    }
  },
  children: [{
      path: '/',
      name: 'orderList',
      meta: {
        title: '订单列表',
        requireAuth: true
      },
      component: () => import('PAGES/som/order/orderList.vue'),
    },
    SomRoute
  ]
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // if (to.meta.requireAuth) {
  //   if (userModule.checkToken()) {
  //     if (to.name != 'Login') {
  //       store.commit('pageJump', to)
  //     }
  //     next();
  //   } else {
  //     window.location.href = userModule.loginPageUrl;
  //   }

  // } else {
  //   if (to.name != 'Login') {
  //     store.commit('pageJump', to)
  //   }
  //   if (!to.meta.title) {
  //     Vue.prototype.$message.error(
  //       '路径失效，请联系管理员'
  //     )
  //     return
  //   }
  //   next();
  // }
  next();
});

export default router