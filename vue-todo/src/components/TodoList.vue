<template>
  <div class="todo">
    <form class="todo-form">
      <fieldset>
        <legend class="a11y-hidden">todo 추가</legend>
        <label class="a11y-hidden" for="todo-input">todo 입력 input 태그</label>
        <input type="text" id="todo-input" @keydown.enter="setTodos" @input="setTodoContent" :value="getTodoContent"/>
      </fieldset>
    </form>
    <ul>
      <todo-item v-for="(todo, index) in getTodos" :todo="todo"></todo-item>
    </ul>
  </div>
</template>
<script>
import TodoItem from './TodoListComps/TodoItem.vue';

export default {
  components: {
    TodoItem
  },
  data () {
    return {
      content: ''
    }
  },
  created: function() {
    this.$store.dispatch('getTodoData');
  },
  methods: {
    setTodos(e) {
      e.preventDefault();
      let date = new Date();

      this.$store.dispatch('postTodoData', {
        content: this.content,
        date: date.getFullYear() + '. ' + (date.getMonth()+1) + '. ' + date.getDate() 
      })
      this.content = '';
    },
    setTodoContent(e) {
      this.content = e.target.value;
    }
  },
  computed: {
    getTodos() {
      return this.$store.getters.getData;
    },
    getTodoContent() {
      return this.content;
    }
  }

}
</script>

<style lang="scss">
</style>