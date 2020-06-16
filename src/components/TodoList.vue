<template>
  <div class='todo-list'>
    <div class='todo-list-title'>{{list.title}}</div>
    <ul class='todos-container'>
      <TodoItem
          v-for="item in tasksListSorted"
          :item="item"
          :key="item.id"
          :editable="false"
        ></TodoItem>
    </ul>
    <div>
      <router-link title='Посмотреть все' v-if="isMoreTasks" :to="{ name: 'TodoListChanging', params: { id: list.id }}" class='link inline-block'>
        <div class='more-tasks inline-block'>...</div>
      </router-link>
      <div v-else></div>
    </div>

    <div class='control-panel'>
      <router-link :tabIndex="-1" title='Редактировать' :to="{ name: 'TodoListChanging', params: { id: list.id }}" class='link'>
        <BaseButton  class='edit-button'>
          <img src="@/assets/editIcon.png" class='icon-button'>
        </BaseButton>
      </router-link>
      <a title='Удалить' class='link'>
        <BaseButton @click="deleteList" class='delete-button'>
          <img src="@/assets/deleteIcon.png" class='icon-button'>
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
    list: {
      type: Object,
      required: true
    }
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

<style scoped>
  .control-panel {
    display: flex;
    justify-content: space-between;
  }
  .link {
    display: flex;
    text-decoration: none;
  }
  .todo-list {
    width: 290px;
    height: 290px;
    padding: 20px;
    background: #ffeeb6;
    margin: 20px;
    display: grid;
    grid-template-rows: 40px 1fr 40px 40px;
  }
  .todo-list-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
    text-overflow: ellipsis;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .todos-container {
    padding: 0;
    margin: 0;
  }
  .delete-button:hover {
    background: rgba(255, 0, 0, 0.57);
    border-color: rgba(255, 0, 0, 0.57);
  }
  .more-tasks {
    font-size: 3rem;
    transform: rotate(180deg);
    user-select: none;
  }
  .more-tasks:hover {
    color: green;
  }
  .inline-block {
    display: inline-block;
  }
</style>
