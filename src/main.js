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
Vue.prototype.$axios = axios // 将axios共享给所有的实例使用
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
