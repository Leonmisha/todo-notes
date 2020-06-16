import Vue from 'vue'
import Vuex from 'vuex'

import { loadState, saveState } from './sessionStorage'

const initialState = {}
initialState.todoLists = loadState() || [] // Загружаем данные из локального хранилища браузера при запуске
initialState.prompt = { text: '', confirmed: null, isModalVisible: false, callBack: null }

Vue.use(Vuex)

const store = new Vuex.Store({
  state: initialState,
  mutations: {
    ADD_LIST (state) {
      let newId
      const listsLength = state.todoLists.length
      if (listsLength > 0) {
        const lastList = state.todoLists[state.todoLists.length - 1]
        newId = lastList.id + 1
      } else {
        newId = 1
      }
      state.todoLists.push({
        id: newId,
        title: `${newId} заметка`,
        tasksList: []
      })
    },
    DELETE_LIST (state, id) {
      state.todoLists = state.todoLists.filter(list => list.id !== id)
    },
    UPDATE_LIST (state, updatedList) {
      const index = state.todoLists.findIndex(list => list.id === updatedList.id)
      if (index !== -1) { state.todoLists[index] = updatedList }
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
      state.prompt = { ...state.prompt, text: '', isModalVisible: false, confirmed }
      const callBack = state.prompt.callBack
      if (callBack != null) { callBack(confirmed) }
    }
  },
  actions: {
    ADD_LIST: (context) => {
      context.commit('ADD_LIST')
      return context.state.todoLists[context.state.todoLists.length - 1].id
    },
    DELETE_LIST: (context, id) => {
      context.commit('DELETE_LIST', id)
    },
    UPDATE_LIST: (context, updatedList) => {
      context.commit('UPDATE_LIST', updatedList)
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
    }
  },
  getters: {
    TODO_LISTS: state => state.todoLists,
    PROMPT: state => state.prompt
  }
})

const TodoListsMutationTypes = ['ADD_LIST', 'DELETE_LIST', 'UPDATE_LIST']

// Сохраняем все изменения в локальное хранилище браузера
store.subscribe((mutation, state) => {
  if (TodoListsMutationTypes.includes(mutation.type)) {
    saveState(state.todoLists)
  }
})

export default store
