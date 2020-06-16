<template>
  <li class='todo-item' :class="{'todo-item-done': item.done, 'todo-item-first': isFirstChild}">
    <div v-if="editable" class='todo-item-editable'>
      <input class='todo-checkbox' type='checkbox' v-model="item.done" />
      <input class='todo-text' :disabled="item.done" required maxlength='125' minlength='1' type='text' v-model="item.text" />
      <button class='delete-item-button' type='button' @click="deleteItem" >X</button>
      <button ref="submitButton" type='submit' style='display: none'></button>
    </div>
    <div v-else class='todo-item-not-editable'>
      <input class='todo-checkbox' type='checkbox' :checked="item.done" disabled='true'/>
      <p class='todo-text'>{{item.text}}</p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      required: true
    },
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
  .todo-item {
    list-style: none;
  }
  .todo-item > div {
    display: grid;
    align-items: center;
    justify-content: center;
  }
  .todo-item-not-editable {
    grid-template-columns: 20px 1fr;
  }
  .todo-item-editable {
    grid-template-columns: 20px 1fr 20px;
  }
  .todo-text {
    text-align: left;
    margin-left: 5px;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
  .todo-item-done .todo-text {
    text-decoration: line-through;
  }
  .todo-item-not-editable .todo-text {
    font-family: 'Caveat', cursive;
    font-size: 1.3rem;
    margin: 15px;
    height: 25px;
    overflow-y: hidden;
  }
  .todo-item-editable .todo-text {
    height: 40px;
    border: 1px solid black;
    border-top: none;
    padding-left: 5px;
    font-size: 1.05rem;
  }
  .todo-item-first .todo-item-editable .todo-text {
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
  .todo-item-editable .todo-checkbox {
    width: 15px;
    height: 15px;
  }
</style>
