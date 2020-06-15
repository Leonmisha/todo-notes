<template>
  <div class="todoListChanging">
    <form>
      <div class="todoListChanging-head">
        <h1>
          <input class="list-title" required v-focus v-model="todoListLocal.title" placeholder="Название заметки"/>
        </h1>
        <div class="undo-redo-delete-buttons">
          <BaseButton :action="undoChanges" :disabled="todoNotChanged" class="undo-button">
            <img src="../assets/undoIcon.png" style="height: 25px;" class='icon-button'>
          </BaseButton>
          <BaseButton :disabled="!(redoEnabled)" :action="redoChanges" class="redo-button">
            <img src="../assets/redoIcon.png" style="height: 25px;" class='icon-button'>
          </BaseButton>
          <BaseButton :action="deleteList" class="delete-button">
            <img src="../assets/deleteIcon.png" style="height: 25px;" class='icon-button'>
          </BaseButton>
        </div>
      </div>
      <div class="tasks">
        <TheTodoItemNew :callback="addTask" />
        <TodoItem
          v-for="item in todoListLocal.tasksList"
          :item="item"
          :key="item.id"
          :editable="true"
          :deleteItemAction="deleteTask"
          :isFirstChild="item.id === todoListLocal.tasksList[0].id"
          class="todo-item"
        />
      </div>
      <BaseButton :action="cancelChanges" class="cancel-button">
        Отменить
      </BaseButton>
      <BaseButton type="button" :action="saveChanges" class="save-button">
        Сохранить
      </BaseButton>
    </form>

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
    },
    todoNotChanged () {
      return JSON.stringify(this.todoList) === JSON.stringify(this.todoListLocal)
    }
  },
  data () {
    return {
      todoListLastChange: null,
      redoEnabled: false,
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
      this.todoListLocal.tasksList = this.todoListLocal.tasksList
        .filter(task => task.id !== taskId)
    },
    deleteList () {
      this.$store.dispatch('SHOW_MODAL', { text: 'Вы уверены, что хотите удалить заметку?', callBack: this.handleConfirmation(this._deleteList) })
    },
    cancelChanges () {
      if (this.$route.query.new === 'true') {
        this.$store.dispatch('SHOW_MODAL', {
          text: 'Вы уверены, что хотите отменить создание?',
          callBack: this.handleConfirmation(this._deleteList)
        })
      } else if (this.todoNotChanged) {
        this.goHome()
      } else {
        this.$store.dispatch('SHOW_MODAL', {
          text: 'Вы уверены, что хотите отменить редактирование?',
          callBack: this.handleConfirmation(this.goHome)
        })
      }
    },
    undoChanges () {
      if (this.todoNotChanged) {
        return false
      }
      this.todoListLastChange = { ...this.todoListLocal }
      this.todoListLocal = JSON.parse(JSON.stringify(this.todoList))
      this.redoEnabled = true
    },
    redoChanges () {
      if (this.todoListLastChange === null) {
        return false
      }
      this.todoListLocal = JSON.parse(JSON.stringify(this.todoListLastChange))
      this.todoListLastChange = null
      this.redoEnabled = false
    },
    saveChanges (e) {
      e.preventDefault()
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
        // Выделение при новой заметке el.select()
      }
    }
  }
}
</script>

<style scoped>
.delete-button:hover {
  background: rgba(255, 0, 0, 0.57);
  border-color: rgba(255, 0, 0, 0.57);
}
button:disabled .icon-button {
  filter: invert(0.5);
}
.list-title {
  font-size: 1.5rem;
  text-align: center;
  border: 2px solid rgba(204,204,204, 0.5);
  border-radius: 4px;
  width: 100%;
}
.list-title:focus {
  border-color: #555;
}
.todoListChanging {
  width: 600px;
  margin: 0 auto;
}
.tasks {
  width: 500px;
  margin: 20px auto;
}
.todoListChanging-head {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.undo-redo-delete-buttons {
  display: flex;
  align-items: center;
}
.undo-button {
  margin-right: 10px;
}
.delete-button {
  margin-left: 25px;
}
.cancel-button {
  margin-right: 50px;
}
</style>
