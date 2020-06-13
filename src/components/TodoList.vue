<template>
  <div class="TodoList">
    <div class="list-title">{{list.title}}</div>
    <ul>
      <TodoItem
          v-for="item in list.tasksList.slice(0,3)"
          :item="item"
          :key="item.id"
          :editable="false"
        ></TodoItem>
    </ul>
    <div class="control-panel">
      <router-link :to="{ name: 'TodoList', params: { id: list.id }}" class='link'>
        <BaseButton tabIndex='-1' class="edit-button">
          <img src="../assets/editIcon.png" style="height: 25px;" class='icon-button'>
        </BaseButton>
      </router-link>
      <BaseButton :action="deleteList" class="delete-button">
        <img src="../assets/deleteIcon.png" style="height: 25px;" class='icon-button'>
      </BaseButton>

    </div>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'TodoList',
  props: {
    list: Object,
    item: Object
  },
  components: {
    TodoItem,
    BaseButton
  },
  methods: {
    deleteList () {
      this.$store.dispatch('SHOW_MODAL', {
        text: `Вы уверены, что хотите удалить заметку? (${this.list.title})`,
        callBack: this.handleConfirmation(this._deleteList)
      })
    },
    _deleteList () {
      this.$store.dispatch('DELETE_LIST', this.list.id)
    },
    handleConfirmation (callbackConfirmed, callbackEjected = null) {
      return (confirmed) => {
        if (confirmed) {
          callbackConfirmed()
        } else if (callbackEjected !== null) {
          callbackEjected()
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.control-panel {
  display: flex;
  justify-content: space-between;
}
.control-panel button {
  width: 40px;
}
.link {
  display: flex;
  text-decoration: none;
}
.TodoList {
  width: 290px;
  height: 290px;
  padding: 20px;
  background: #ffeeb6;
  margin: 20px;
  display: grid;
  grid-template-rows: 50px 1fr 40px;
}
.list-title {
  font-size: 20px;
  margin-bottom: 30px;
}
ul {
  padding: 0;
}
.delete-button:hover {
  background: rgb(255, 0, 0);
  border-color: rgb(255, 0, 0);
}
.edit-button:hover {
  background: rgb(247, 194, 15);
  border-color: rgb(247, 194, 15);
}
</style>
