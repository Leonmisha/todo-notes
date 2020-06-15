<template>
  <form class="TodoItemNew">
    <input
      v-model="newTodoText"
      placeholder='Что нужно сделать?'
      required
      maxlength="125"
    />
    <button @click="addTodo" type="submit" class="add-item-button">+</button>
  </form>
</template>

<script>
export default {
  name: 'TheTodoItemNew',
  data () {
    return {
      newTodoText: ''
    }
  },
  methods: {
    addTodo () {
      const newTodoText = this.newTodoText && this.newTodoText.trim()
      if (!newTodoText) {
        return false
      }
      setTimeout(() => {
        this.callback(newTodoText)
        this.newTodoText = ''
      }, 0)
    }
  },
  props: {
    callback: Function
  }
}
</script>

<style scoped>
.TodoItemNew {
  display: flex;
  margin: 0 0 10px 25px;
}
input {
  width: 100%;
  height: 40px;
  border: 1px solid #eac452;
  padding-left: 5px;
  font-size: 1.05rem;
}
input:focus {
  box-shadow: 1px 1px 5px #ecca20;
  outline: none;
}
input::placeholder {
  font-style: italic;
}
.add-item-button {
   background: none;
   border: none;
   color: green;
   font-size: 1.3rem;
   cursor: pointer;
   transition: 0.5s;
   padding: 0;
   margin: 0 3px 0 5px;
   backface-visibility: hidden;
}
.add-item-button:focus {
  outline: none;
}
.add-item-button:hover,
.add-item-button:focus {
  transform: scale(1.3);
  transition: 0.5s;
}
</style>
