import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import modules from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    siteName: 'Quick-Vue-SPA',
    user: {
      id: null,
    },
  },
  getters: {
    logined(state) {
      return state.user.id !== null;
    },
  },
  mutations,
  actions,
  modules,
});

module.exports = store;
