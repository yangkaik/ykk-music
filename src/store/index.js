import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// mutations修改后的日志输出
import creatLogger from 'vuex/dist/logger'

Vue.use(Vuex)
// npm run dev 是dev环境，npm run build 是production
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  // vuex严格模式
  strict: debug,
  plugins: debug ? [creatLogger()] : []
})
