import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import {store} from './store/'

Vue.use(VueResource);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
