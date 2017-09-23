import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import {store} from './store/'

Vue.config.keyCodes.enter = 13;

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
