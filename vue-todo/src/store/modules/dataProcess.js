import Vue from 'Vue';
import VueResource from 'vue-resource'

Vue.use(VueResource);
// console.log(Vue.http.get);

const state = {
  // firebase url
  URL: 'https://vue-todo-7f10a.firebaseio.com/todo.json',
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

function getFirebase(state, url) {

  state.db_data = [];
  
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
}
const actions = {
  getDataFromTheFirebase(context) {
    getFirebase(context.state, state.URL);
  },
  addDataToFirebase(context, payload) {

    let state = context.state, url = state.URL;
 
    Vue.http.post(url, payload)
            .then(response => {
              response.status === 200 && getFirebase(context.state, context.state.URL);
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
  }
}
export const dataProcess = {
  state,
  getters,
  mutations,
  actions
}