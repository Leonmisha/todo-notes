import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/todo/:id',
    name: 'TodoList',
    component: () => import(/* webpackChunkName: "TodoList" */ '../views/TodoList.vue')
  },
  {
    path: '/404',
    name: 'Page404',
    component: () => import(/* webpackChunkName: "Page404" */ '../views/Page404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

export default router
