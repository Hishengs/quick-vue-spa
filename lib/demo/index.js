import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import router from './router.js';
import store from './store';
import api from './api';
import util from './util';
import App from './page/app.vue';
import './style/index.less';

Vue.use(iView);

function installPlugin(plugin, name){
  window[name] = plugin;
  plugin.install = function(Vue, options){
    Vue.prototype[name] = this;
  };
  Vue.use(plugin);
}
installPlugin(api, 'api');
installPlugin(util, 'util');

window.app = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
