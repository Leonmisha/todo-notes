<template>
  <div class="TodoList">
    <div class="list-title">{{list.title}}</div>
    <ul>
      <TodoItem
          v-for="item in tasksListSorted"
          :item="item"
          :key="item.id"
          :editable="false"
        ></TodoItem>
    </ul>
    <div>
      <router-link title='Посмотреть все' v-if="isMoreTasks" :to="{ name: 'TodoListChanging', params: { id: list.id }}" class='link inline-block'>
        <div class="more-Tasks inline-block">...</div>
      </router-link>
      <div v-else></div>
    </div>

    <div class="control-panel">
      <router-link :tabIndex="-1" title='Редактировать' :to="{ name: 'TodoListChanging', params: { id: list.id }}" class='link'>
        <BaseButton  class="edit-button">
          <img src="../assets/editIcon.png" style="height: 25px;" class='icon-button'>
        </BaseButton>
      </router-link>
      <a title='Удалить' class='link'>
        <BaseButton :action="deleteList" class="delete-button">
          <img src="../assets/deleteIcon.png" style="height: 25px;" class='icon-button'>
        </BaseButton>
      </a>
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
  computed: {
    tasksListSorted () {
      let tasksListCopy = [...this.list.tasksList]
      tasksListCopy = tasksListCopy.map(task => { return { ...task } })
      tasksListCopy.sort((a, b) => {
        if (a.done === b.done) {
          return 0
        } else if (a.done === false) {
          return -1
        } else {
          return 1
        }
      })
      return tasksListCopy.slice(0, 3)
    },
    isMoreTasks () {
      return this.list.tasksList.length > 3
    }
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
  grid-template-rows: 40px 1fr 40px 40px;
}
.list-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  overflow-x: hidden;
  overflow-y: hidden;
}
ul {
  padding: 0;
  margin: 0;
}
.delete-button:hover {
  background: rgba(255, 0, 0, 0.57);
  border-color: rgba(255, 0, 0, 0.57);
}
.more-Tasks {
  font-size: 3rem;
  transform: rotate(180deg);
  user-select: none;
}
.more-Tasks:hover {
  color: green;
}
.inline-block {
  display: inline-block;
}
</style>
