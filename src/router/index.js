import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout/index.vue'
import Login from '../views/login/index.vue'
import Home from '../views/home/index.vue'
import Article from '../views/article/index.vue'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
import CommentDetail from '@/views/comment-detail'
import Media from '@/views/media'
import Account from '@/views/account'
// 加载nprogress
import Nprogress from 'nprogress'
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
      { // 内容发布
        path: '/publish',
        component: Publish

      },
      { // 文章编辑
        path: '/publish/:articleId',
        component: Publish
      },
      // 评论列表
      {
        path: '/comment',
        component: Comment
      },
      {
        path: '/comment/:articleId',
        component: CommentDetail,
        props: true
      },
      {
        path: '/media',
        component: Media,
        props: true
      },
      {
        path: '/account',
        component: Account
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
// 路由拦截器 beforeEach方法
// 参数1：to，表示去哪里的路由信息
// 参数2：from，表示来自哪里的路由信息
// 参数3：next，它是一个方法，用于路由放行
// 我们具体要做的就是：判断用户的登录状态，有就通过，没有就跳转到登录页。
router.beforeEach((to, from, next) => {
  // 开启顶部导航进度条
  Nprogress.start()
  // console.log('所有的页面访问都经过这里')

  // 访问登录页面直接放行
  if (to.path === '/login') {
    next()
    return
  }

  // 非登录页面,校验登录状态
  // 获取token
  const token = window.localStorage.getItem('user-token')
  // 判断是否有token 有就通过 没有就跳转登录页
  if (token) {
    next()
  } else {
    next('/login')
    // 在登录页面为非登录状态的时候 手动终止进度条
    Nprogress.done()
  }
})
// 路由导航器结束以后触发全局后置钩子
router.afterEach((to, from) => {
  // 结束顶部导航进度条
  Nprogress.done()
})

export default router
