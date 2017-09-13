<template>
  <div id="app">
    <todo-list></todo-list>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue';

export default {
  components: {
    TodoList
  },
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
}
html {
  font-size: 10px;
}
body {
  font-size: 1.4rem;
}
p {
  margin: 0;
}
button {
  border: none;
  padding: 0;
  background: transparent;
  cursor: pointer;
}
.a11y-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
  clip: rect(0 0 0 0);
  overflow: hidden;
  margin: -1px;
}
input {
  padding: 0 0 0 10px;   
}
</style>
