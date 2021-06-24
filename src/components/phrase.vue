<script>
  export default {
    data() {
      return {
        input: [],
      };
    },
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
    padding: 20px;
    margin: 15px 0;
    display: flex;
  }
  .placeholder {
    width: 100px;
    aspect-ratio: 1 / 1;
    border: 5px dashed black;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
