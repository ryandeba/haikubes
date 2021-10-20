<script>
  export default {
    components: {
      "preview-dialog": require("./preview-dialog").default,
    },

    data() {
      return {
        phrases: undefined,
      };
    },

    watch: {
      phrases() {
        if (this.phrases) {
          this.openDialog();
        }
      }
    },

    methods: {
      openDialog() {
        this.$refs.dialog.openDialog = true;
      }
    },

    mounted() {
      let phrases = new URLSearchParams(document.location.search).get("preview");

      if (phrases) {
        this.phrases = JSON.parse(phrases);
      }

      let url = new URL(window.location);
      url.searchParams.delete("preview");

      history.replaceState(undefined, "", url);
    }
  }
</script>

<template>
  <div>
    <preview-dialog
      :phrases="phrases"
      ref="dialog"
      fromURL
    ></preview-dialog>
  </div>
</template>
