import Vue from 'vue'
import Vuex from 'vuex'

import { saveState } from '../redux/sessionStorage'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    todoList: []
  },
  mutations: {
    ADD_LIST (state, title) {
      state.todoList.push({
        id: state.todoList.length + 1,
        title,
        tasksList: []
      })
    },
    DELETE_LIST (state, id) {
      state.todoList = state.todoList.filter(list => list.id !== id)
    },
    CHANGE_LIST_TITLE (state, id, newTitle) {
      state.todoList.find(list => list.id === id).title = newTitle
    },
    ADD_TASK (state, listId, text) {
      const tasksList = state.todoList.find(list => list.id === listId).tasksList
      tasksList.push({
        id: tasksList.length + 1,
        done: false,
        text: text
      })
    },
    DELETE_TASK (state, listId, taskId) {
      state.todoList
        .find(list => list.id === listId).tasksList
        .filter(task => task.id !== taskId)
    },
    CHECK_TASK (state, listId, taskId, checked) {
      const task = state.todoList.find(list => list.id === listId)
        .taskList.find(task => task.id === taskId)
      task.done = checked
    },
    CHANGE_TASK_TEXT (state, listId, taskId, newText) {
      const task = state.todoList.find(list => list.id === listId)
        .taskList.find(task => task.id === taskId)
      task.text = newText
    }
  },
  getters: {
    TODO_LIST: state => state.todoList
  }
})

store.subscribe((mutation, state) => {
  saveState(state)
})

export default store
