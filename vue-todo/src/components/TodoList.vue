<template>
  <div>
    <label for="add-todo-title"></label>
    <input type="text" id="add-todo-title" @input="setTodoTitle" @value="getTodoTitle"/>
    <label for="add-todo-content"></label>
    <input type="text" id="add-todo-content" @input="setTodoContent" @value="getTodoContent"/>
    <button type="button">저장</button>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  data () {
    return {

      // data: 제목 날짜 글내용
      // 기능: 추가 삭제 수정
      todo: {
        date: '',
        title: '',
        content: ''
      }
    }
  },
  methods: {
    ...mapActions({
      post: 'ADD_DATA_TO_FIREBASE'
    }),
    setTodoTitle(e) {
      this.todo.title = e.target.value;
    },
    setTodoContent(e) {
      this.todo.content = e.target.value;
    },
    sendData() {

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