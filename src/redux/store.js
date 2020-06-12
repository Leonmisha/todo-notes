import { createStore } from 'redux'
import reducer from './reducer.js'
import { saveState } from './sessionStorage'

const store = createStore(reducer)

store.subscribe(() => {
  saveState(store.getState())
})

window.store = store
export default store
