<template>
  <div class="TodoItem">
    <input type="checkbox" readonly :value="item.done" onclick="return false;"/>
    <p>{{item.text}}</p>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    item: Object
  }
}
</script>
<style scoped>
.TodoItem {
  display: flex;
}
</style>
