<template>
  <li class="TodoItem">
    <div v-if="editable">
      <input type='checkbox' v-model="item.done" />
      <input type='text' v-model="item.text" class='task-text' />
    </div>
    <div v-else>
      <input type='checkbox' :value="item.done" disabled="true"/>
      <p class='task-text' >{{item.text}}</p>
    </div>

  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    item: Object,
    editable: Boolean
  }
}
</script>
<style scoped>
.TodoItem {
  list-style: none;
  list-style-position: inside;
}
.TodoItem > div {
  display: grid;
  grid-template-columns: 20px 1fr;
  align-items: center;
  justify-content: center;
}
.task-text {
  text-align: left;
  margin-left: 5px;
  overflow-x: hidden;
  text-overflow: ellipsis;
}
</style>
