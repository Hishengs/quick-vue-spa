import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    siteName: 'vue-spa',
    user: {
      id: null
    }
  },
  getters: {
    logined(state) {
      return state.user.id !== null;
    }
  },
  actions,
  mutations,
});

module.exports = store;
