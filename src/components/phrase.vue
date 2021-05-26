<script>
  import Word from './word.vue';

  export default {
    props: ["value", "maxSyllables"],

    components: {
      Word
    },

    data() {
      return {
        input: [],
      };
    },

    watch: {
      value: {
        handler() {
          this.input = JSON.parse(JSON.stringify(this.value));
        },
        immediate: true
      },

      input() {
        if (JSON.stringify(this.input) == JSON.stringify(this.value)) {
          return;
        }

        this.$emit("input", JSON.parse(JSON.stringify(this.input)));
      }
    },
  }
</script>

<template>
  <div class="phrase">
    <template v-for="(w, i) in input">
      <word
        v-bind="w"
        :key="'word' + i"
      ></word>
    </template>
    <!--
    <div class="placeholder" v-for="i in maxSyllables" :key="i">
      <v-icon x-large color="black">mdi-plus</v-icon>
    </div>
    -->
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
