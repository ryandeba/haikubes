<script>
  export default {
  }
</script>

<template>
  <div class="green">
    <div class="phrase">
      <div class="kube" v-for="i in 5" :key="i">{{ i }}pontificate</div>
    </div>

    <div class="phrase">
      <div class="kube" v-for="i in 7" :key="i">{{ i }}aquaphor</div>
    </div>

    <div class="phrase">
      <div class="kube" v-for="i in 5" :key="i">{{ i }}</div>
    </div>
  </div>
</template>

<style scoped>
  .phrase {
    display: flex;
  }

  .kube {
    border: 1px solid red;
    border-radius: 10px;
    aspect-ratio: 1/1;
    width: 12%;
    margin: 1%;
    font-size: 0.5rem;
  }
</style>
