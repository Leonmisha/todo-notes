import Vue from 'vue'
import Vuex from 'vuex'

import { loadState, saveState } from './sessionStorage'

const initialState = {}
initialState.todoList = loadState() || {}
initialState.prompt = { text: '', confirmed: false }

Vue.use(Vuex)

const store = new Vuex.Store({
  state: initialState,
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
    },
    SET_TEXT_PROMPT (state, text) {
      state.prompt.text = text
    },
    SET_CONFRIMED_PROMPT (state, comfirmed) {
      state.prompt.confirmed = comfirmed
    }
  },
  actions: {
    ADD_LIST: (context, title) => {
      context.commit('SET_NAME', title)
    },
    DELETE_LIST: (context, id) => {
      context.commit('DELETE_LIST', id)
    },
    CHANGE_LIST_TITLE: (context, id, newTitle) => {
      context.commit('CHANGE_LIST_TITLE', id, newTitle)
    },
    ADD_TASK: (context, listId, text) => {
      context.commit('ADD_TASK', listId, text)
    },
    DELETE_TASK: (context, listId, taskId) => {
      context.commit('DELETE_TASK', listId, taskId)
    },
    CHECK_TASK: (context, listId, taskId, checked) => {
      context.commit('CHECK_TASK', listId, taskId, checked)
    },
    CHANGE_TASK_TEXT: (context, listId, taskId, newText) => {
      context.commit('CHANGE_TASK_TEXT', listId, taskId, newText)
    },
    SET_TEXT_PROMPT: (context, text) => {
      context.commit('SET_TEXT_PROMPT', text)
    },
    SET_CONFRIMED_PROMPT: (context, confirmed) => {
      context.commit('SET_TEXT_PROMPT', confirmed)
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

export default store
