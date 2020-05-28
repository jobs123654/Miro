// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import  './assets/css/bootstrap.css'
import animate from 'animate.css'
import 'view-design/dist/styles/iview.css';
import kriging from './assets/js/kriging.js'
import VueRouter from 'vue-router'
import Login from './components/Login'
import Index from './components/Index'
import VueDragResize from 'vue-drag-resize'
import XLSX from 'xlsx'
import $ from 'jquery'
import  './assets/js/bootstrap.min.js'
import ViewUI from 'view-design';
import echarts from 'echarts'



Vue.use(ViewUI);
Vue.prototype.XLSX = XLSX 
Vue.prototype.kriging = kriging 
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.prototype.$echarts = echarts
Vue.component('vue-drag-resize', VueDragResize)
//Vue路由：配置路由
const routes = [
  {path: '/login', component: Login},
  {path: '/index', component: Index},
  {path: '*', redirect: '/index'} /*默认跳转路由 */
]
//Vue路由：实例化VueRouter 
const router = new VueRouter({
  routes //缩写，相当于 routes:routes
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router,
  template: '<App/>',
  store:store
})
