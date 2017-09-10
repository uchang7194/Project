import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import {dataProcessing} from './store/'

Vue.use(VueResource);
Vue.use(Vuex);

const store = new Vuex.Store({
  dataProcessing
});

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
