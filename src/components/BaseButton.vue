<template>
  <button
    @click="action"
    class='base-button'
    :type="type">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    action: {
      type: Function,
      default: () => {}
    },
    type: {
      type: String,
      default: 'button'
    }
  }
}
</script>

 <style scoped>
  .base-button {
    display: inline-block;
    padding: 5px 10px;
    font-size: 1.2rem;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    outline: none;
    color: #fff;
    background-color: #eac452;
    border: none;
    border-radius: 15px;
    box-shadow: 0 5px #999;
  }
  .base-button:hover,
  .base-button:focus {
    background: rgb(255, 191, 0);
    border-color: rgb(255, 191, 0);
  }
  .base-button:focus {
    box-shadow: 0 5px black;
  }
  .base-button:active:not([disabled]) {
    background-color: #eac452;
    box-shadow: 0 1px #666;
    transform: translateY(4px);
  }
  .base-button[disabled] {
    background-color: white;
    cursor: not-allowed;
  }
</style>
