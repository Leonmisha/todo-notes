<template>
  <div class="TodoList">
    <p>{{list.title}}</p>
      <TodoItem
          v-for="item in list.tasksList"
          v-bind:item="item"
          v-bind:key="item.id"
        ></TodoItem>
    <div class="control-panel">
      <router-link :to="{ name: 'TodoList', params: { id: list.id }}">
        <button>Редактировать</button>
      </router-link>
      <button>Удалить</button>
    </div>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'
export default {
  name: 'TodoList',
  props: {
    list: Object,
    item: Object
  },
  components: {
    TodoItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
 <style scoped>
 .control-panel {
   display: flex;
 }
</style>
