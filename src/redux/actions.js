export const ADD_TASK = 'ADD_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const CHECK_TASK = 'CHECK_TASK'
export const CHANGE_TASK_TEXT = 'CHANGE_TASK_TEXT'

export const ADD_LIST = 'ADD_LIST'
export const DELETE_LIST = 'DELETE_LIST'
export const CHANGE_LIST_TITLE = 'CHANGE_LIST_TITLE'

export const addTask = (listId, text) => ({
  type: ADD_TASK,
  listId,
  text
})

export const deleteTask = (listId, taskId) => ({
  type: DELETE_TASK,
  listId,
  taskId
})

export const checkTask = (listId, taskId, checked) => ({
  type: CHECK_TASK,
  listId,
  taskId,
  checked
})

export const changeTaskText = (listId, taskId, newText) => ({
  type: CHANGE_TASK_TEXT,
  listId,
  taskId,
  newText
})

export const addList = (title) => ({
  type: ADD_LIST,
  title
})

export const deleteList = (id) => ({
  type: DELETE_LIST,
  id
})

export const changeListTitle = (id, newTitle) => ({
  type: CHANGE_LIST_TITLE,
  id,
  newTitle
})
