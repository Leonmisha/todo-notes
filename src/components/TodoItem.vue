<template>
  <li class="TodoItem" :class="{'TodoItem-done': item.done, isFirstChild: isFirstChild}">
    <div v-if="editable" class="TodoItem-editable">
      <input class='task-checkbox' type='checkbox' v-model="item.done" />
      <input class='task-text' :disabled="item.done" required maxlength="125" minlength="1" type='text' v-model="item.text" />
      <button type="button" @click="deleteItem" class="delete-item-button" >X</button>
      <button ref="submitButton" type="submit" style="display: none"></button>
    </div>
    <div v-else class="TodoItem-not-editable">
      <input class='task-checkbox' type='checkbox' :checked="item.done" disabled="true"/>
      <p class='task-text'>{{item.text}}</p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    item: Object,
    editable: Boolean,
    deleteItemAction: {
      type: Function,
      default: function () {}
    },
    isFirstChild: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    deleteItem () {
      return this.deleteItemAction(this.item.id)
    }
  }
}
</script>
<style scoped>
.TodoItem {
  list-style: none;
  list-style-position: inside;
}
.TodoItem > div {
  display: grid;
  align-items: center;
  justify-content: center;
}
.TodoItem-not-editable {
  grid-template-columns: 20px 1fr;
}
.TodoItem-editable {
  grid-template-columns: 20px 1fr 20px;
}
.task-text {
  text-align: left;
  margin-left: 5px;
  overflow-x: hidden;
  text-overflow: ellipsis;
}
.TodoItem-done .task-text {
  text-decoration: line-through;
}
.TodoItem-not-editable .task-text {
  font-family: 'Caveat', cursive;
  font-size: 1.3rem;
  margin: 15px;
  height: 25px;
  overflow-y: hidden;
}
.TodoItem-editable .task-text {
  height: 40px;
  border: 1px solid black;
  border-top: none;
  padding-left: 5px;
  font-size: 1.05rem;
}
.TodoItem.isFirstChild .task-text {
  border-top: 1px solid black;
}
.delete-item-button {
   background: none;
   border: none;
   color: red;
   font-size: 1rem;
   cursor: pointer;
   transition: 0.5s;
}
.delete-item-button:focus {
  outline: none;
}
.delete-item-button:hover,
.delete-item-button:focus {
  transform: scale(1.3);
  transition: 0.5s;
}
.TodoItem-editable .task-checkbox {
  width: 15px;
  height: 15px;
}
</style>
