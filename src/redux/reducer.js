import * as actions from './actions'
import { loadState } from './sessionStorage'

const initialState = loadState() || { todoList: [] }

function Reducer (state = initialState, action) {
  switch (action.type) {
    case actions.ADD_LIST:
      return ({
        todoList: [...state.todoList, {
          id: state.todoList.length + 1,
          title: action.title,
          tasksList: []
        }]
      })
    case actions.DELETE_LIST:
      return ({
        todoList: state.todoList.filter(list => list.id !== action.id)
      })
    case actions.CHANGE_LIST_TITLE:
      return ({
        todoList: state.todoList.map(list => {
          if (list.id === action.id) { list.title = action.newTitle }
          return list
        })
      })

    case actions.ADD_TASK:
      return ({
        todoList: state.todoList.map(list => {
          if (list.id === action.listId) {
            return {
              ...list,
              tasksList: [
                ...list.tasksList,
                {
                  id: list.tasksList.length + 1,
                  done: false,
                  text: action.text
                }]
            }
          }
          return list
        })
      })
    case actions.DELETE_TASK:
      return ({
        todoList: state.todoList.map(list => {
          if (list.id === action.listId) {
            return {
              ...list,
              tasksList: list.tasksList.filter(task => task.id !== action.taskId)
            }
          }
          return list
        })
      })
    case actions.CHECK_TASK:
      return ({
        todoList: state.todoList.map(list => {
          if (list.id === action.listId) {
            return {
              ...list,
              tasksList: list.tasksList.map(task => {
                if (task.id === action.taskId) {
                  task.done = action.checked
                }
                return task
              })
            }
          }
          return list
        })
      })
    case actions.CHANGE_TASK_TEXT:
      return ({
        todoList: state.todoList.map(list => {
          if (list.id === action.listId) {
            return {
              ...list,
              tasksList: list.tasksList.map(task => {
                if (task.id === action.taskId) {
                  task.text = action.newText
                }
                return task
              })
            }
          }
          return list
        })
      })
    default:
      return state
  }
}

export default Reducer
