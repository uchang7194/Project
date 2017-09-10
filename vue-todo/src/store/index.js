import Vue from 'Vue';
import VueResource from 'vue-resource'

Vue.use(VueResource);
// console.log(Vue.http.get);

const state = {
  // firebase url
  URL: 'https://vue-todo-7f10a.firebaseio.com/',
  TODO_URL: 'todo.json',
  // 데이터 받기
  //    로컬에서
  local_data: {
    today: '',
    title: '',
    contents: ''
  },
  //    파이어베이스에서
  db_data: []
  // 데이터 삭제
  // 데이터 수정
}
const getters = {
  getData() {

  }
}
const mutations = {
  // GET
  GET_DATA_FROM_THE_FIREBASE(state, payload) {
    if(typeof payload !== 'string') { throw '문자열이 아닙니다.' }
    let url = '';
    if(payload === 'todo') {
      url = state.URL + state.TODO_URL;
    }
    Vue.http.get(url)
            .then(response => {
              return response.json();
            })
            .then(data => {
              state.db_data = Object.values(data);
            })
            .catch(error => {
              console.log(error);
            });
  },
  // POST
  ADD_DATA_TO_FIREBASE(state, payload) {
    if(typeof payload.distance !== 'string') { throw '문자열이 아닙니다.' }
    let url = '';
    if(payload.distance === 'todo') {
      url = state.URL + state.TODO_URL;
    }
    Vue.http.post(url, payload)
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(response);
            });
  }
  // DELETE
  // PUT
}
const actions = {
  getDataFromTheFirebase({commit}, payload) {
    commit(GET_DATA_FROM_THE_FIREBASE, payload);
  },
  addDataToFirebase({commit}, payload) {
    commit(ADD_DATA_TO_FIREBASE, payload);
  }
}
export const dataProcessing = {
  state,
  getters,
  mutations,
  actions
}