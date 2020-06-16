const itemName = 'todoLists'

export const saveState = (state) => {
  sessionStorage.setItem(itemName, JSON.stringify(state))
}

export const loadState = () => {
  return JSON.parse(sessionStorage.getItem(itemName))
}
