import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'logo',
    component: () => import( '../pages/login.vue')
  },
  {
    path: '/success',
    name: 'success',
    component: () => import( '../pages/success')
  },
  {
    path: '/error',
    name: 'error',
    component: () => import( '../pages/error')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
