import Vue from 'Vue';
import VueResource from 'vue-resource'

Vue.use(VueResource);
console.log(Vue.http.get);

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

const actions = {
  getTodoData({state}) {
    Vue.http.get(state.URL)
            .then(response => {
              if(response.status === 200) {
                let keys = Object.keys(response.data), 
                    values = Object.values(response.data),
                    temp_arr = [];
                
                for(let i = 0, len = keys.length; i < len; i++) {
                  temp_arr.push({
                    key: keys[i],
                    values: values[i]
                  });
                }

                state.db_data = temp_arr;
              } 
            }, response => {
              // error
            })
  },
  postTodoData({state, dispatch}, data) {

    Vue.http.post(state.URL, data)
            .then(response => {
              // console.log(response);
              // console.log(actions);
              dispatch('getTodoData');
            }, response => {
              // error
            })
  }
}

export const dataProcess = {
  state,
  getters,
  mutations,
  actions
}