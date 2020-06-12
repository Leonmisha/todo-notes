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
      <BaseButton :action="showModal" text="Удалить"/>
    </div>
  </div>
  <ModalWindow
      v-show="isModalVisible"
      :onClose="closeModal"
    />
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
    TodoItem,
    BaseButton,
    ModalWindow
  },
  methods: {
    showModal () {
      this.isModalVisible = true;
    },
    closeModal () {
      this.isModalVisible = false;
      if (confirmed) {
        this.$store.dispatch('DELETE_LIST', list.id)
      }
    },
    deleteList () {
      this.$store.dispatch('DELETE_LIST', list.id)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
 <style scoped>
 .control-panel {
   display: flex;
 }
</style>
