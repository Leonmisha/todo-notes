<!--
  Это cтраница редактирования определенной заметки, а так же создание новой.
  Все изменения до нажатия на кнопку "Сохранить" вносятся в локальное состояние компонента.
  После нажатия все данные будут сохранены в глобальное хранилище Vuex + локальное хранилище браузера
-->

<template>
  <form class='todo-list-changing' @submit.prevent>
      <div class='todo-list-head'>
        <h1>
          <input class='todo-list-title' required v-focus="isNew" v-model="todoListLocal.title" placeholder="Название заметки"/>
        </h1>
        <div class='todo-list-top-buttons'>
          <BaseButton @click="undoChanges" :disabled="todoNotChanged" class='undo-button'>
            <img src="@/assets/undoIcon.png" class='icon-button'>
          </BaseButton>
          <BaseButton :disabled="!(redoEnabled)" @click="redoChanges" class='redo-button'>
            <img src="@/assets/redoIcon.png" class='icon-button'>
          </BaseButton>
          <BaseButton @click="deleteList" class='delete-button'>
            <img src="@/assets/deleteIcon.png" class='icon-button'>
          </BaseButton>
        </div>
      </div>
      <div class='todos-container'>
        <TheTodoItemNew v-focus="!isNew" :callback="addTask" />
        <TodoItem
          v-for="item in todoListLocal.tasksList"
          :item="item"
          :key="item.id"
          :editable="true"
          :deleteItemAction="deleteTask"
          :isFirstChild="item.id === todoListLocal.tasksList[0].id"
          class='todo-item'
        />
      </div>
      <BaseButton @click="cancelChanges" class='cancel-button'>
        Отменить
      </BaseButton>
      <BaseButton type="button" @click="saveChanges" class='save-button'>
        Сохранить
      </BaseButton>
  </form>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'
import BaseButton from '@/components/BaseButton.vue'
import TheTodoItemNew from '@/components/TheTodoItemNew.vue'

export default {
  name: 'TodoListChanging',
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
      return this.$store.getters.TODO_LISTS
        .find(list => list.id === parseInt(this.id))
    },
    todoNotChanged () {
      return JSON.stringify(this.todoList) === JSON.stringify(this.todoListLocal)
    },
    isNew () {
      return this.$route.query.new === 'true'
    }
  },
  data () {
    return {
      todoListLastChange: null, // Сохраненяем копию перед отменой внесенного изменения
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
      if (this.isNew) {
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
      this.todoListLocal.title = this.todoListLocal.title && this.todoListLocal.title.trim()
      if (!this.todoListLocal.title) {
        this.todoListLocal.title = this.todoList.title
      }
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
      inserted: function (el, binding) {
        if (binding.value) {
          if (binding.expression === 'isNew') {
            el.focus()
            el.select()
          } else {
            el[0].focus()
          }
        }
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
  .todo-list-title {
    font-size: 1.5rem;
    text-align: center;
    border: 2px solid rgba(204,204,204, 0.5);
    border-radius: 4px;
    width: 100%;
  }
  .todo-list-title:focus {
    border-color: #555;
  }
  .todo-list-changing {
    width: 600px;
    margin: 0 auto;
    padding-left: calc(100vw - 100%);
  }
  .todos-container {
    width: 500px;
    margin: 20px auto;
  }
  .todo-list-head {
    display: flex;
    flex-direction: column;
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
