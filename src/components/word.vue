<script>
  export default {
    props: ["label", "selected"],

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
  <!-- TODO: stop using click events if they will have conflicts with drag events -->
  <div
    class="word"
    :class="selected ? 'selected' : ''"
    draggable
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    @click="$emit('tap')"
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

  .selected {
    background: #eeeeee55;
  }
</style>
