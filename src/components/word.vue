<script>
  export default {
    props: ["label"],

    data() {
      return {
        dragging: false,
      };
    },

    watch: {
      dragging() {
        if (this.dragging) {
          this.$emit("drag:start");
        } else {
          this.$emit("drag:stop");
        }
      }
    },

    methods: {
      onDragStart() {
        this.dragging = true;
      },

      onDragEnd() {
        this.dragging = false;
      },
    }

  }
</script>

<template>
  <div
    class="word"
    draggable
    @dragstart="onDragStart"
    @dragend="onDragEnd"
  >
    {{ label }}
  </div>
</template>

<style scoped>
  .word {
    width: 100%;
    min-height: 50px;
    aspect-ratio: 1/1;
    box-shadow: 0 0 5px 2px #ccc;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    z-index: 1;
    position: relative;
  }
</style>
