<script>
  export default {
    props: ["label"],
  }
</script>

<template>
  <div class="word" draggable>
    {{ label }}
  </div>
</template>

<style scoped>
  .word {
    width: 100px;
    height: 100px;
    box-shadow: 0 0 5px 2px #ccc;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
  }
</style>
