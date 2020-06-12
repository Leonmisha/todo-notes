<template>
  <div class="home">
    <h1>Заметки</h1>
    <TodoLists/>
    <BaseButton :action="addList" text="Создать новую заметку"/>
  </div>
</template>

<script>
// @ is an alias to /src
// [{ id: 0, title: 'Завтра сделать:', tasksList: [{ id: 0, done: false, text: 'Do it' }] }]
import TodoLists from '@/components/TodoLists.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'Home',
  components: {
    TodoLists,
    BaseButton
  },
  methods: {
    addList: function () {
      this.$router.push({ name: 'TodoList', params: { id: 'new' } })
    }
  }
}
</script>

<style scoped>

</style>
