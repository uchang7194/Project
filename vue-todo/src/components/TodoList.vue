<template>
  <div class="todo">
    <div :class="is_loading ? 'loading-box actived' : 'loading-box'">
      <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      <span class="a11y-hidden">Loading...</span>
    </div>
    <!--s:add-todo-->
    <div :class="is_addTodo ? 'add-todo actived' : 'add-todo'">
      <div class="add-todo-inner">
        <div class="title">
          <label for="add-todo-title">제목</label>
          <input type="text" id="add-todo-title" @input="setTodoTitle" @value="getTodoTitle"/>
        </div>
        <div class="content">
          <label for="add-todo-content">내용</label>
          <!--input type="text" id="add-todo-content" @input="setTodoContent" @value="getTodoContent"/-->
          <textarea id="add-todo-content" @input="setTodoContent" @value="getTodoContent"></textarea>
        </div>
        <button type="button" class="send-btn" @click="sendData">저장</button>
        <button type="button" class="close-btn" @click="activedAddTodo">
          <span class="a11y-hidden">닫기버튼</span>
          <i class="fa fa-times" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <!--e:add-todo-->
    <!--s:searchTodos-->
    <div class="header">
      <div class="header-inner">
        <div class="input-box">
          <label><input type="text" class="search" @input="setSearchValue" @value="getSearchValue"/></label>
          <button type="button" class="search-btn">
            <span class="a11y-hidden">검색버튼</span>
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
        <div class="add-box">
          <button type="button" class="add-todo-btn" @click="activedAddTodo">추가하기</button>
        </div>
      </div>
    </div>
    <!--e:searchTodos-->
    <!--s:todo-list-->
    <ul class="todo-list">
      <li v-for="(todo, index) in filterdTodos" class="todo-item" :data-index="index">
        <div class="title-box">
          <p class="todo-title">
            {{todo.value.title}}
          </p>
          <span class="todo-date">{{todo.value.date}}</span>
          <button type="button" class="update-btn" @click="updateActived">
            <span class="a11y-hidden">수정버튼</span>
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button type="button" class="del-btn" @click="deleteFirebaseItem">
            <span class="a11y-hidden">삭제버튼</span>
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
        <div class="content-box">
          <p class="todo-content" v-for="content in todo.value.content">
            {{content}}
          </p>
        </div>
      </li>
    </ul>
    <!--e:todo-list-->
  </div>
</template>
<script>
export default {
  data () {
    return {
      URL: 'https://vue-todo-7f10a.firebaseio.com/todo.json',
      // data: 제목 날짜 글내용
      // 기능: 추가 삭제 수정
      todo: {
        date: '',
        title: '',
        content: ''
      },
      is_loading: false,
      is_addTodo: false,
      is_update: false,
      update_index: 0,
      todos: [],
      search_value: ''
    }
  },
  created: function() {
    this.getFirebase();
  },
  methods: {
    // 파이어베이스 통신
    // GET
    getFirebase() {
      this.$http.get(this.URL)
                .then(response => {
                  if(response.status === 200) {
                    this.is_loading = false;

                    return response.json();
                  } else {
                    setTimeOut(() => {
                      alert('서버 통신에 실패했습니다.');
                      this.is_loading = false;
                    }, 5000)
                  }
                })
                .then(data => {
                  
                  if(data === null || data === undefined) {
                    this.todos = [];
                    return;
                  }
                  let values = Object.values(data),
                      keys = Object.keys(data),
                      temp_arr = [];

                  for(let i = 0, len = values.length; i < len; i++) {
                    // console.log('before: ', values[i].content);
                    // values[i].content.replace(/(?:\r\n|\r|\n)/g, '<br/>');
                    // console.log('after: ', values[i].content);
                    values[i].content = values[i].content.split('\n');
                    temp_arr.push({
                      key: keys[i],
                      value: values[i]
                    });
                  }
                  this.todos = temp_arr;
                  console.log('GET: ', this.todos);
                })
                .catch(error => {
                  console.log(error);
                });
    },
    // POST
    setFirebase(todo) {
      this.$http.post(this.URL, todo)
              .then(response => {
                this.getFirebase();
              })
              .catch(error => {
                console.log(error);
              });
    },
    // DELETE
    deleteFirebaseItem(e) {
      let index = this.findElement(e.target, 'class', 'todo-item').getAttribute('data-index'),
          isDel = confirm('삭제하시겠습니까?');

      if(isDel) {
        firebase.database().ref('todo/' + this.todos[index].key).set({}).then(() => {
          this.is_loading = true;
          this.getFirebase();
        });
      }
    },
    updateFirebaseItem(todo, key) {
      firebase.database().ref('todo/' + key).set(todo).then(() => {
        this.getFirebase();
      });
    },
    updateActived(e) {
      let vm = this, index = vm.findElement(e.target, 'class', 'todo-item').getAttribute('data-index'),
          root = vm.$el.querySelector('.add-todo');

      vm.is_update = !vm.is_update;
      vm.update_index = index;

      let title = vm.todos[index].value.title;
      root.querySelector('#add-todo-title').setAttribute('value', title);
      vm.todo.title = title;
      // console.log('update content: ', typeof vm.todos[index].value.content.join(''));
      let content = vm.todos[index].value.content.map(curr => { return curr + '\n' }).join('');
      root.querySelector('#add-todo-content').value = content;
      vm.todo.content = content;

      vm.is_addTodo = !vm.is_addTodo;
    },
    findElement(el, attr, name) {
      do{
        el = el.parentNode;
      }while(el.getAttribute(attr) !== name)

      return el;
    },
    // data -> todo
    setTodoTitle(e) {
      this.todo.title = e.target.value;
    },
    setTodoContent(e) {
      this.todo.content = e.target.value;
    },
    setSearchValue(e) {
      this.search_value = e.target.value;
    },
    sendData() {
      let vm = this, date = new Date();

      vm.todo.date = date.getFullYear() + '. ' + (date.getMonth() + 1) + '. ' + date.getDate();
      // vm.todo.content.replace(/(\r|\n)/g, 'sss');
      console.log('sendData: ', vm.todo.content);
      if(!vm.isEmpty()) {
        return;
      }  

      this.is_loading = true;

      if(vm.is_update) {
        vm.is_update = !vm.is_update;
        vm.updateFirebaseItem(vm.todo, this.todos[vm.update_index].key);
      } else {
        vm.setFirebase(vm.todo);
      }
      vm.activedAddTodo();
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
    },
    activedAddTodo() {
      let vm = this, root = vm.$el.querySelector('.add-todo');
      console.log('root: ', root);
      vm.is_addTodo = !vm.is_addTodo;
      
      if(vm.is_update) {
        vm.is_update = !vm.is_update;
      }
      root.querySelector('#add-todo-title').setAttribute('value', '');
      console.log(root.querySelector('#add-todo-title').getAttribute('value'));
      vm.todo.title = '';
      root.querySelector('#add-todo-content').setAttribute('value', '');
      console.log(root.querySelector('#add-todo-content').getAttribute('value'));
      vm.todo.content = '';
    }
  },
  computed: {
    getTodoTitle() {
      return this.todo.title;
    },
    getTodoContent() {
      return this.todo.content;
    },
    getSearchValue() {
      return this.search_value;
    },
    filterdTodos() {
      return this.todos.filter(data => {
        let title = data.value.title,
            content = data.value.content,
            date = data.value.date,
            filtered_data = false,
            value = this.search_value;
        
        if(title.indexOf(value) !== -1 || content.indexOf(value) !== -1 || date.indexOf(value) !== -1) {
          filtered_data = true;
        }
        return filtered_data;
      });
    } 
  }
  
}
</script>

<style lang="scss">
$max_width: 1024px;
$gutter: 10px;

.loading-box {
  display: none;
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;

  .fa {
    font-size: 5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
  }
  &.actived {
    display: block;
  }
}
.todo {
  max-width: 100%;
}
.todo-list {
  box-sizing: border-box;
  list-style: none;
  max-width: $max_width;
  margin: 30px auto 0 auto;
  padding: 0;
  &::after {
    content: '';
    display: block;
    clear: both;
  }
  li {
    box-sizing: border-box;
    float: left;
    width: calc(#{$max_width}/ 4 - #{$gutter});
    box-shadow: 2px 2px 2px 2px #999;
    margin-right: $gutter;
    margin-bottom: 25px;
    &:last-child {
      margin-right: 0;
    }
  }
}
.title-box {
  position: relative;
  padding: 20px 5px;
  border-bottom: 1px solid #aaa;
  background: lightyellow;

  .del-btn, .update-btn {
    position: absolute;
    top: 25%;
    font-size: 1.6rem;
    transform: translateY(-50%);
  }
  .del-btn {
    right: 10px;
  }
  .update-btn {
    right: calc(1.6rem + 10px);
  }
}
.todo-title {
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
}
.todo-date {
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 1.2rem;
  color: #aaa;
}
.content-box {
  min-height: 250px;
  padding: 12px 5px 10px 5px;
}
// s:header-todo
.header {
  width: 100%;
  box-shadow: 0 0 3px 2px #ddd;
}
.header-inner {
  position: relative;
  width: $max_width;
  margin: 0 auto;
}
.input-box {
  position: relative;
  $desktop-width: 300px;
  width: $desktop-width;
  height: 90px;
  margin: 0 auto;

  input {
    position: absolute;
    box-sizing: border-box;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 50%;
    border: 2px solid #ddd;
  }
  .search-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .content {
    input {
      min-height: 100px;
    }
  }
}
// e:header-todo
// s:add-todo
.add-box {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
.add-todo {
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  &.actived {
    display: block;
  }
}
.add-todo-inner {
  position: absolute;
  box-sizing: border-box;
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px 15px 20px 15px;
  background: #fff;

  label, span {
    display: block;
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  input, textarea {
    box-sizing: border-box;
    width: 100%;
    border: 1px solid #aaa;
    margin-bottom: 20px;
  }
  #add-todo-title {
    min-height: 25px;
  }
  #add-todo-content {
    min-height: 100px;
  }
  .send-btn {
    width: 100%;
    padding: 10px 0;
    background: lightblue;
    font-size: 1.8rem;
    font-weight: bold;
  }
  .close-btn {
    position: absolute;
    top: 20px;
    right: 15px;
    font-size: 1.8rem;
  }
}
// e:add-todo

// tablet
@media screen and (max-width: 1023px) {
  .todo-list {
    width: 100%;
    padding: 0 0 0 $gutter;
    li {
      width: calc(50% - #{$gutter});
    }
  }
  .header-inner {
    width: 100%;
  }
  .add-box {
    position: relative;
    text-align: right;
    padding: 0 20px;
  }
}
// mobile
@media screen and (max-width: 768px) {
  .todo-list {
    padding: 0 10px;
    li {
      width: 100%;
    }
  }
}
</style>