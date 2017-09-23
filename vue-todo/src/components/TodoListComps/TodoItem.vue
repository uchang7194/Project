<template>
  <li>
    <p class="todo">
      <span class="content">{{todo.values.content}}</span>
      <span class="date">{{todo.values.date}}</span>
    </p>
    <div class="utills">
      <button class="todo-update-btn" type="button">수정</button>
      <button class="todo-del-btn" type="button">삭제</button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['todo'],
  data () {
    return {}
  }
}
</script>

<style lang="scss">
li {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
  &::after {
    content: '';
    display: block;
    clear: both;
    height: 0;
  }
  .todo, .utills{
    float: left;
    &::after {
      content: '';
      display: block;
      clear: both;
    }
  }
  .todo {
    width: 85%;
    & > * {
      float: left;
    }
    & > span {
      display: block;
    }
    .content {
      width: calc(100% - 100px);
    }
    .date {
      min-width: 100px;
      text-align: right;
    }
  }
  .utills {
    width: 15%;  
    text-align: center;
  }
}
</style>