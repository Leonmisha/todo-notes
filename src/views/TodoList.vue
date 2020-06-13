<template>
  <div class="todoListChanging">
    <h1>
      <input v-focus v-model="todoListLocal.title" placeholder="Название заметки"/>
    </h1>
    <TheTodoItemNew :callback="addTask" />
    <TodoItem
      v-for="item in todoListLocal.tasksList"
      :item="item"
      :key="item.id"
      :editable="true"
    />
    <BaseButton :action="deleteList" class="delete-button">
      <img src="../assets/deleteIcon.png" style="height: 25px;" class='icon-button'>
    </BaseButton>
    <BaseButton :action="cancelChanges">
      Отменить
    </BaseButton>
    <BaseButton :action="saveChanges">
      Сохранить
    </BaseButton>
    <BaseButton :action="undoChanges">
      Ctrl+Z
    </BaseButton>
    <BaseButton :disabled="!(redoEnabled)" :action="redoChanges">
      Ctrl+Y
    </BaseButton>

  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'
import BaseButton from '@/components/BaseButton.vue'
import TheTodoItemNew from '@/components/TheTodoItemNew.vue'

export default {
  name: 'TodoList',
  components: {
    TodoItem,
    TheTodoItemNew,
    BaseButton
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    todoList () {
      return this.$store.getters.TODO_LIST
        .find(list => list.id === parseInt(this.id))
    }
  },
  data () {
    return {
      todoListLastChange: null,
      redoEnabled: false,
      undoEnabled: false,
      todoListLocal: null
    }
  },
  methods: {
    addTask (text) {
      this.todoListLocal.tasksList.push({
        id: this.todoListLocal.tasksList.length + 1,
        done: false,
        text: text
      })
    },
    deleteTask (taskId) {
      this.todoListLocal.tasksList
        .filter(task => task.id !== taskId)
    },
    deleteList () {
      this.$store.dispatch('SHOW_MODAL', { text: 'Вы уверены, что хотите удалить заметку?', callBack: this.handleConfirmation(this._deleteList) })
    },
    cancelChanges () {
      this.$store.dispatch('SHOW_MODAL', { text: 'Вы уверены, что хотите отменить редактирование?', callBack: this.handleConfirmation(this.goHome) })
    },
    undoChanges () {
      if (JSON.stringify(this.todoListLocal) === JSON.stringify(this.todoList)) {
        return false
      }
      this.todoListLastChange = { ...this.todoListLocal }
      this.todoListLocal = JSON.parse(JSON.stringify(this.todoList))
      this.redoEnabled = true
      this.undoEnabled = false
    },
    redoChanges () {
      if (this.todoListLastChange === null) {
        return false
      }
      this.todoListLocal = JSON.parse(JSON.stringify(this.todoListLastChange))
      this.todoListLastChange = null
      this.redoEnabled = false
      this.undoEnabled = true
    },
    saveChanges () {
      this.updateList()
      this.goHome()
    },
    handleConfirmation (callbackConfirmed, callbackEjected = null) {
      return (confirmed) => {
        if (confirmed) {
          callbackConfirmed()
        } else if (callbackEjected !== null) {
          callbackEjected()
        }
      }
    },
    _deleteList () {
      this.$store.dispatch('DELETE_LIST', this.todoListLocal.id)
        .then(this.goHome())
    },
    goHome () {
      this.todoListLastChange = null
      this.$router.push({ name: 'Home' })
    },
    updateList () {
      this.$store.dispatch('UPDATE_LIST', this.todoListLocal)
    }
  },
  created () {
    this.todoListLocal = JSON.parse(JSON.stringify(this.todoList))
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>

<style scoped>
.delete-button:hover {
  background: rgb(255, 0, 0);
  border-color: rgb(255, 0, 0);
}
</style>
