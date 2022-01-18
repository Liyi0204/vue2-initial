import Vue from 'vue'
import VueRouter from 'vue-router'
import userModule from "../module/userModule";

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'login',
  component: () => import('../pages/Home.vue')
}, ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (userModule.checkToken()) {
      if (userModule.checkToken()) {
        next();
      } else {
        next({ path: "/login" });
      }
    }
  } else {
    next();
  }
});

export default router