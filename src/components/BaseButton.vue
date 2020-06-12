<template>
  <button v-on:click="action()">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    text: String,
    action: Function
  }
}
</script>

 <style scoped>
</style>
