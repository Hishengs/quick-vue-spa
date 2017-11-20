import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import router from './router.js';
import api from './api';
import App from './page/app.vue';

Vue.use(iView);

function setPlugin(plugin, name){
  window[name] = plugin;
  plugin.install = function(Vue, options){
    Vue.prototype[name] = this;
  };
  Vue.use(plugin);
}
setPlugin(api, 'api');

window.app = new Vue({
	el: '#app',
	router: router,
	render: h => h(App)
});
