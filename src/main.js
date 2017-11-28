import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import router from './router'
import 'common/stylus/index.styl'
import VueLeazyLoad from 'vue-lazyload'
import store from './store'

// 解决移动端点击300毫秒延迟问题
fastclick.attach(document.body)

Vue.use(VueLeazyLoad, {
  // require语法是webpack支持的，将图片替换成base64格式
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
