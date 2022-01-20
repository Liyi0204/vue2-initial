import Vue from 'vue';
import VueRouter from 'vue-router';
import userModule from "../module/userModule";
import store from '@/vuex/store'; //全局仓储
import Global from 'ASSETS/js/global.js'; //全局封装方法
import SomRoute from "./som-route";

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
    },
    component: () => import('PAGES/login.vue'),
  },
  {
    path: '/',
    name: 'index',
    meta: {
      title: '首页',
    },
    component: () => import('PAGES/index.vue'),
    children: [{
        path: '/',
        name: 'HomeWdom',
        meta: {
          title: 'HomeWdom',
        },
        component: () => import('COMPS/HelloWdom.vue'),
      },
      SomRoute
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (userModule.checkToken()) {
      if (userModule.checkToken()) {
        if (to.name != 'Login') {
          store.commit('pageJump', to)
        }
        next();
      } else {
        next({
          path: "/login"
        });
        Global.toast('页面路径无效')
      }
    }
  } else {
    if (to.name != 'Login') {
      store.commit('pageJump', to)
    }
    if (!to.meta.title) {
      Global.toast('页面路径无效');
      return
    }
    next();
  }
});

export default router