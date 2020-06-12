<template>
  <div class="home">
    <h1>Заметки</h1>
    <TodoLists :todoLists="todoLists"/>
    <BaseButton :action="addList" text="Создать новую заметку"/>
  </div>
</template>

<script>
// @ is an alias to /src
import TodoLists from '@/components/TodoLists.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'Home',
  data () {
    return {
      todoLists: [{ id: 0, title: 'Завтра сделать:', tasksList: [{ id: 0, done: false, text: 'Do it' }] }]
    }
  },
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
