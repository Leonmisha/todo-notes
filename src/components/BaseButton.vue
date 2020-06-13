<template>
  <button
    v-on:click="action()"
    :disabled="disabled"
    class='base-button'
    :tabIndex="tabIndex">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    action: Function,
    disabled: {
      type: Boolean,
      default: false
    },
    tabIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>

 <style scoped>
 .base-button {
   cursor: pointer;
 }
</style>
