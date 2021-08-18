<script>
  export default {
  }
</script>

<template>
  <div class="phrase">
    <slot></slot>
  </div>
</template>

<style scoped>
  .phrase {
    min-height: 100px;
    box-shadow: inset 0 0 5px 2px #ccc;
    border-radius: 3px;
    margin: 15px 0;
    display: flex;
  }
  
</style>
