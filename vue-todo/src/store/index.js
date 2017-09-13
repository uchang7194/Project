import Vue from 'vue';
import Vuex from 'vuex';
import {dataProcess} from './modules/dataProcess.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    dataProcess
  }
});