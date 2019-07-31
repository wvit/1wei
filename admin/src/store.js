import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/utils.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    userInfo: utils.store.get('userInfo') || null, //用户登录状态
  },
  mutations: {
    //设置登录用户
    setAdmin(state, userInfo) {
      utils.store.set('userInfo', userInfo);
      state.userInfo = userInfo;
    },
  },
  modules: {}
})