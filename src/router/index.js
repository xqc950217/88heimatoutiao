import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout/index.vue'
import Login from '../views/login/index.vue'
import Home from '../views/home/index.vue'
import Article from '../views/article/index.vue'
import Publish from '@/views/publish'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  // 一级路由主页
  {
    path: '/',
    component: Layout,
    children: [
      { // 首页
        path: '', // 默认子路由 只能有一个
        component: Home
      },
      { // 文章列表
        path: '/article',
        component: Article
      },
      { // 文章发布
        path: '/publish',
        component: Publish

      }
    ]
  },
  // 一级路由登录页
  {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
