<script>
  export default {
    data() {
      return {
        dragging: false,
      };
    },

    methods: {
      onDragEnter() {
        this.dragging = true;
      },

      onDragLeave() {
        this.dragging = false;
      },

      onDrop() {
        this.dragging = false;
        this.$emit("dropped");
      },
    },
  }
</script>

<template>
  <div
    class="drop-target"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop="onDrop"
    @dragover.prevent
  >
    <slot></slot>

    <div
      class="drop-target--placeholder"
      :class="{
        'drop-target--placeholder--active': dragging
      }"
    ></div>
  </div>
</template>

<style scoped>
  .drop-target {
    /* width: 100px;
    min-height: 100px; */
    aspect-ratio: 1/1;
    position: relative;
    user-select: none;
  }

  .drop-target:not(.drop-target--naked) .drop-target--placeholder {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    border: 4px dashed transparent;
    border-radius: 100px;
    background: #ccc;
    opacity: 0.3;
    transform: scale(0.3);
    transition: all 0.2s;
    z-index: 0;

    pointer-events: none;
  }

  .drop-target:not(.drop-target--naked) .drop-target--placeholder--hidden {
    transform: scale(0);
  }

  .drop-target:not(.drop-target--naked) .drop-target--placeholder--active {
    background: none;
    border: 4px dashed #000;
    border-radius: 5px;
    transform: scale(1);
    opacity: 1;
  }
</style>
