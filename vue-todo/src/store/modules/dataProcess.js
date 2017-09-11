import Vue from 'Vue';
import VueResource from 'vue-resource'

Vue.use(VueResource);
// console.log(Vue.http.get);

const state = {
  // firebase url
  URL: 'https://vue-todo-7f10a.firebaseio.com/',
  TODO_URL: 'todo.json',
  // 데이터 받기
  db_data: []
  // 데이터 삭제
  // 데이터 수정
}
const getters = {
  getData(state) {
    return state.db_data;
  }
}
const mutations = {
  // DELETE
  // PUT
}
const actions = {
  getDataFromTheFirebase(context, payload) {
    if(typeof payload !== 'string') { throw '문자열이 아닙니다.' }
    let url = '', state = context.state;
    if(payload === 'todo') {
      url = state.URL + state.TODO_URL;
    }
    Vue.http.get(url)
            .then(response => {
              return response.json();
            })
            .then(data => {
              // state.db_data = Object.values(data);
              let values = Object.values(data),
                  keys = Object.keys(data);
              
              for(let i = 0, len = values.length; i < len; i++) {
                state.db_data.push({
                  key: keys[i],
                  value: values[i]
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
  },
  addDataToFirebase(context, payload) {

    if(typeof payload.distance !== 'string') { throw '문자열이 아닙니다.' }

    let url = state.URL + payload.distance, 
        state = context.state;
 
    Vue.http.post(url, payload.todo)
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(response);
            });
  }
}
export const dataProcess = {
  state,
  getters,
  mutations,
  actions
}