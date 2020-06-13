<template>
  <div class="TodoItemNew">
    <input
      v-model="newTodoText"
      placeholder='Опишите новую задачу'
      @keyup.enter="addTodo"
    />
  </div>
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
      this.callback(newTodoText)
      this.newTodoText = ''
    }
  },
  props: {
    callback: Function
  }
}
</script>
<style scoped>
.TodoItem {
  display: flex;
}
</style>
