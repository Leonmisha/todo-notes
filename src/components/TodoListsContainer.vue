<template>
  <div class='todo-lists-container'>
    <TodoList
        v-for="list in todoLists"
        :list="list"
        :key="list.id"
      ></TodoList>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList.vue'

export default {
  name: 'TodoListsContainer',
  components: {
    TodoList
  },
  computed: {
    todoLists () {
      return this.$store.getters.TODO_LISTS
    }
  },
  data: () => ({
    isModalVisible: false
  })
}
</script>

<style scoped>
  .todo-lists-container {
   display: flex;
   width: 1120px;
   margin: 0 auto;
   justify-content: center;
   align-items: center;
   flex-wrap: wrap;
   padding-left: calc(100vw - 100%);
  }
</style>
