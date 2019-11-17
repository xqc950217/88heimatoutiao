import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import JSONbig from 'json-bigint'
import axios from 'axios'
import 'nprogress/nprogress.css' // 第三方包中的文件不需要写具体路径 写包名就行
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置 axios的常态地址
axios.defaults.transformResponse = [function (data, headers) {
  try {
    return JSONbig.parse(data)
  } catch (err) {
    console.log(err)
    return {}
  }
}]
// axios请求拦截器
axios.interceptors.request.use(function (config) {
  // 在请求拦截器函数中的config是本次请求的相关的配置对象
  // config是最后要发给后端的配置对象
  // 在拦截器中对config进行统一配置订制
  console.log('请求拦截器', config)
  const token = window.localStorage.getItem('user-token')
  // 统一添加token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // return config 是通行的规则
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  console.log('响应拦截器')
  return response
}, function (error) {
  return Promise.reject(error)
})
Vue.prototype.$axios = axios // 将axios共享给所有的实例使用
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
