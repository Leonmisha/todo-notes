<template>
  <div id="app">
    <router-view/>
    <transition name="fade">
      <ModalWindow
          v-show="isModalVisible"
          :onClose="closeModal"
          :text="text"
          :isModalVisible="isModalVisible"
        />
    </transition>
  </div>
</template>

<script>
import ModalWindow from '@/components/ModalWindow'

export default {
  name: 'App',
  components: {
    ModalWindow
  },
  methods: {
    closeModal (confirmed) {
      this.$store.dispatch('CLOSE_MODAL', confirmed)
    }
  },
  data () {
    return {
      unsubscribe: null
    }
  },
  computed: {
    isModalVisible () {
      return this.$store.getters.PROMPT.isModalVisible
    },
    text () {
      return this.$store.getters.PROMPT.text
    }
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'SHOW_MODAL') {
        document.body.classList.add('stopScrolling')
      } else if (mutation.type === 'CLOSE_MODAL') {
        document.body.classList.remove('stopScrolling')
      }
    })
  },
  destroyed () {
    this.unsubscribe()
  }
}
</script>

<style>
img {
  max-width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.stopScrolling {
  height: 100%;
  overflow: hidden;
}
.base-button img {
  display: flex;
  margin: 0 auto;
}
.icon-button {
  height: 30px;
}
button:disabled .icon-button {
  filter: invert(0.5);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
