<template>
  <div class="home">
    <h1>Заметки</h1>
    <TodoLists/>
    <a title='Создать заметку' @keyup.enter.space="addList()" @click="addList()" class='create-button' tabIndex='0'>+</a>
  </div>
</template>

<script>
import TodoLists from '@/components/TodoLists.vue'

export default {
  name: 'Home',
  components: {
    TodoLists
  },
  methods: {
    addList: function () {
      this.$store.dispatch('ADD_LIST')
        .then((d) => {
          this.$router.push({ name: 'TodoListChanging', params: { id: d }, query: { new: 'true' } })
        })
    }
  }
}
</script>

<style scoped>
.create-button {
  position: relative;
  z-index: 1;
  display: inline-block;
  width: 1.3em;
  height: 1.3em;
  line-height: 1.3em;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  text-shadow: 1px 1px rgba(255,255,255,.3);
  font-size: 300%;
  font-weight: 900;
  color: #000;
  border-radius: 100%;
  background: rgb(144,142,105) linear-gradient(rgb(185,181,151), rgb(144,142,105));
  box-shadow:
   inset 0 -2px 1px rgba(0,0,0,.5),
   inset 0 2px 1px rgba(255,255,255,.9),
   0 4px 4px rgba(0,0,0,.9);
}
.create-button:after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 12%;
  left: 12%;
  right: 12%;
  bottom: 12%;
  border-radius: 100%;
  background: rgb(242,203,20) linear-gradient(rgb(242,203,20), rgb(255,182,7));
  box-shadow:
   inset 0 2px 1px rgba(0,0,0,.5),
   inset 0 -2px 1px rgba(255,255,255,.3);
}
.create-button:hover {
  cursor: pointer;
  color: green;
}
.create-button:focus {
  background: green;
  outline: none;
  color: green;
}
</style>
