<template>
  <div class="TodoLists">
    <TodoList
        v-for="item in todoLists"
        v-bind:list="item"
        v-bind:key="item.id"
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
  }
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
 }
/*h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */

</style>
