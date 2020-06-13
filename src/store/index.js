import Vue from 'vue'
import Vuex from 'vuex'

import { loadState, saveState } from './sessionStorage'

const initialState = {}
initialState.todoList = loadState() || []
initialState.prompt = { text: '', confirmed: null, isModalVisible: false, callBack: null }

Vue.use(Vuex)

const store = new Vuex.Store({
  state: initialState,
  mutations: {
    ADD_LIST (state) {
      let newId
      const listsLength = state.todoList.length
      if (listsLength > 0) {
        const lastList = state.todoList[state.todoList.length - 1]
        newId = lastList.id + 1
      } else {
        newId = 1
      }
      state.todoList.push({
        id: newId,
        title: `${newId} заметка`,
        tasksList: []
      })
    },
    DELETE_LIST (state, id) {
      state.todoList = state.todoList.filter(list => list.id !== id)
    },
    CHANGE_LIST_TITLE (state, { id, newTitle }) {
      state.todoList.find(list => list.id === id).title = newTitle
    },
    ADD_TASK (state, { listId, text }) {
      const tasksList = state.todoList.find(list => list.id === listId).tasksList
      tasksList.push({
        id: tasksList.length + 1,
        done: false,
        text: text
      })
    },
    DELETE_TASK (state, { listId, taskId }) {
      state.todoList
        .find(list => list.id === listId).tasksList
        .filter(task => task.id !== taskId)
    },
    CHECK_TASK (state, { listId, taskId, checked }) {
      const task = state.todoList.find(list => list.id === listId)
        .taskList.find(task => task.id === taskId)
      task.done = checked
    },
    CHANGE_TASK_TEXT (state, { listId, taskId, newText }) {
      const task = state.todoList.find(list => list.id === listId)
        .taskList.find(task => task.id === taskId)
      task.text = newText
    },
    SET_TEXT_PROMPT (state, text) {
      state.prompt.text = text
    },
    SET_CONFIRMED_PROMPT (state, confirmed) {
      state.prompt.confirmed = confirmed
    },
    SHOW_MODAL (state, { text, callBack }) {
      state.prompt = { text, confirmed: null, isModalVisible: true, callBack }
    },
    CLOSE_MODAL (state, confirmed) {
      state.prompt = { ...state.prompt, isModalVisible: false, confirmed }
      const callBack = state.prompt.callBack
      if (callBack != null) { callBack(confirmed) }
    },
    UPDATE_LIST (state, updatedList) {
      const index = state.todoList.findIndex(list => list.id === updatedList.id)
      if (index !== -1) { state.todoList[index] = updatedList }
    }
  },
  actions: {
    ADD_LIST: (context) => {
      context.commit('ADD_LIST')
      return context.state.todoList[context.state.todoList.length - 1].id
    },
    DELETE_LIST: (context, id) => {
      context.commit('DELETE_LIST', id)
    },
    CHANGE_LIST_TITLE: (context, { id, newTitle }) => {
      context.commit('CHANGE_LIST_TITLE', { id, newTitle })
    },
    ADD_TASK: (context, { listId, text }) => {
      context.commit('ADD_TASK', { listId, text })
    },
    DELETE_TASK: (context, { listId, taskId }) => {
      context.commit('DELETE_TASK', { listId, taskId })
    },
    CHECK_TASK: (context, { listId, taskId, checked }) => {
      context.commit('CHECK_TASK', { listId, taskId, checked })
    },
    CHANGE_TASK_TEXT: (context, { listId, taskId, newText }) => {
      context.commit('CHANGE_TASK_TEXT', { listId, taskId, newText })
    },
    SET_TEXT_PROMPT: (context, text) => {
      context.commit('SET_TEXT_PROMPT', text)
    },
    SET_CONFIRMED_PROMPT: (context, confirmed) => {
      context.commit('SET_CONFIRMED_PROMPT', confirmed)
    },
    SHOW_MODAL: (context, { text, callBack }) => {
      context.commit('SHOW_MODAL', { text, callBack })
    },
    CLOSE_MODAL: (context, confirmed) => {
      context.commit('CLOSE_MODAL', confirmed)
    },
    UPDATE_LIST: (context, updatedList) => {
      context.commit('UPDATE_LIST', updatedList)
    }
  },
  getters: {
    TODO_LIST: state => state.todoList,
    PROMPT: state => state.prompt
  }
})

store.subscribe((mutation, state) => {
  if (mutation.type !== 'SET_TEXT_PROMPT' &&
      mutation.type !== 'SET_CONFRIMED_PROMPT') { saveState(state.todoList) }
})

window.store = store
export default store
