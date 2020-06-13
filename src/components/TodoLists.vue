<template>
  <div class="TodoLists">
    <TodoList
        v-for="item in todoLists"
        :list="item"
        :key="item.id"
      ></TodoList>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList.vue'
export default {
  name: 'TodoLists',
  components: {
    TodoList
  },
  computed: {
    todoLists () {
      return this.$store.getters.TODO_LIST
    }
  },
  data: () => ({
    isModalVisible: false
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
 <style scoped>
 .TodoLists {
   display: flex;
   width: 1120px;
   margin: 0 auto;
   justify-content: center;
   align-items: center;
   flex-wrap: wrap;
 }
</style>
