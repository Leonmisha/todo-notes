<template>
  <div class="modal-background">
    <div class="modal">
      <div class="btn-close">
          <button @click="onClose(false)">
            Х
          </button>
      </div>
      <div class="modal-body">
        <div class="modal-text">
          {{ text }}
        </div>
        <div class="modal-panel">
          <BaseButton
            :action="close(true)"
            ref="yesButton"
            class='modal-panel-button'
            v-on:keyup.right="focusRefNo">
            Да
          </BaseButton>
          <BaseButton
            :action="close(false)"
            class='modal-panel-button'
            v-focus="isModalVisible"
            ref="noButton">
            Нет
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
export default {
  name: 'ModalWindow',
  components: {
    BaseButton
  },
  methods: {
    close (state) {
      return () => {
        this.onClose(state)
      }
    },
    onKeyUpModal (event) {
      if (event.key === 'ArrowLeft' && event.currentTarget.activeElement === this.$refs.noButton.$el) {
        this.$refs.yesButton.$el.focus()
      } else if (event.key === 'ArrowRight' && event.currentTarget.activeElement === this.$refs.yesButton.$el) {
        this.$refs.noButton.$el.focus()
      } else if (event.key === 'Escape') {
        this.close(false)()
      }
    }
  },
  props: {
    onClose: Function,
    text: String,
    isModalVisible: Boolean
  },
  directives: {
    focus: {
      update: function (el, binding) {
        if (binding.value === true) {
          el.focus()
        }
      }
    }
  },
  updated: function () {
    if (this.isModalVisible) {
      window.document.addEventListener('keyup', this.onKeyUpModal)
    } else {
      window.document.removeEventListener('keyup', this.onKeyUpModal)
    }
  }
}
</script>

<style scoped>
  .modal-background {
    position: fixed;
    z-index: 999;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    transition: opacity 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-width: 500px;
    min-height: 200px;
    height: 200px;
    padding: 10px;
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
  }
  .modal-body {
    padding: 10px;
    height: calc( 100% - 20px)
  }
  .modal-panel {
    margin-top: 20px;
  }
  .modal-panel button:first-child {
    margin-right: 20px;
  }
  .modal-panel-button {
    width: 100px;
  }
  .modal-text {
    height: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn-close {
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .btn-close button {
    border: none;
    background: none;
    font-size: 1.3rem;
    cursor: pointer;
  }
</style>
