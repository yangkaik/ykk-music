import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import router from './router'
import 'common/stylus/index.styl'

// 解决移动端点击300毫秒延迟问题
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
