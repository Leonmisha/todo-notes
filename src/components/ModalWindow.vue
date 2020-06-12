<template>
  <div class="modal-background">
    <div class="modal">
      <div class="btn-close">
          <BaseButton :action="close(false)" text="X"/>
      </div>

      <div class="text">
        {{ text }}
      </div>
      <div class="panel">
        <BaseButton :action="close(true)" text='Да'/>
        <BaseButton :action="close(false)" text='Нет'/>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'
  export default {
    name: 'ModalWindow',
    components: {
      BaseButton
    },
    methods: {
      close() {
        this.$emit('close');
        this.onClose()
      },
    },
  };
</script>
