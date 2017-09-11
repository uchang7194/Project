<template>
  <div>
    <label for="add-todo-title"></label>
    <input type="text" id="add-todo-title" @input="setTodoTitle" @value="getTodoTitle"/>
    <label for="add-todo-content"></label>
    <input type="text" id="add-todo-content" @input="setTodoContent" @value="getTodoContent"/>
    <button type="button" @click="sendData">저장</button>
    <ul>
      <li v-for="todo in todos">{{todo.value.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {

      // data: 제목 날짜 글내용
      // 기능: 추가 삭제 수정
      todo: {
        date: '',
        title: '',
        content: ''
      },
      resource: {},
      todos: []
    }
  },
  created: function() {
    let vm = this;

    vm.resource = vm.$resource('todo.json');
    vm.$store.dispatch('getDataFromTheFirebase', 'todo');
    vm.todos = vm.$store.getters.getData;
  },
  methods: {
    setTodoTitle(e) {
      this.todo.title = e.target.value;
    },
    setTodoContent(e) {
      this.todo.content = e.target.value;
    },
    sendData() {
      let vm = this, date = new Date();

      vm.todo.date = date.getFullYear() + '. ' + (date.getMonth() + 1) + '. ' + date.getDate();

      if(!vm.isEmpty()) {
        return;
      }  
      vm.$store.dispatch('addDataToFirebase', {
        distance: 'todo.json',
        todo: vm.todo
      })
      this.initTodoData();
    },
    isEmpty() {
      let todo = this.todo;
      for(let prop in todo) {
        if(todo.hasOwnProperty(prop)) {
          if(todo[prop] === '') {
            alert(prop + '의 내용을 입력하세요.'); 
            return false;
          }
        }
      }
      return true;
    },
    initTodoData() {

      for(let prop in this.todo) {
        if(this.todo.hasOwnProperty(prop)) {
          this.todo[prop] = '';
        }
      }
    }
  },
  computed: {
    getTodoTitle() {
      return this.todo.title;
    },
    getTodoContent() {
      return this.todo.content;
    }
  }
  
}
</script>

<style lang="scss">
</style>