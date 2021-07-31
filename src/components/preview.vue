<script>
  export default {
    components: {
      "preview-dialog": require("./preview-dialog").default,
    },

    props: ["phrases"],

    data() {
      return {
        success: false,
        failure: false
      }
    },

    computed: {
      btnColor() {
        if (this.failure) {
          return 'error';
        } else if (this.success) {
          return 'success';
        } else {
          return 'blue-grey darken-2'
        }
      }
    },

    methods: {
      openDialog() {
        this.$refs.dialog.openDialog = true;
      },

      copyToClipboard() {
        let url = location.href + "?preview=" + `${JSON.stringify(this.phrases)}`;

        navigator.clipboard.writeText(url)
          .then(() => {
            this.success = true;
          }, () => {
              this.failure = true;
          });
      },

      reset() {
        setTimeout(() => {
          this.success = false;
          this.failure = false;
        }, 2000)
      }
    },

    watch: {
      success: "reset",
      failure: "reset"
    }
  }
</script>

<template>
  <div>
    <v-btn icon @click="openDialog"><v-icon large>mdi-eye</v-icon></v-btn>

    <preview-dialog
      :phrases="phrases"
      ref="dialog"
    >
      <template v-slot:shareURL>
        <v-fade-transition mode="out-in">
          <v-btn :key="success + failure" outlined elevation="4" :color="btnColor" @click="copyToClipboard">
            <template v-if="failure">
              <v-icon class="mx-2">mdi-share-variant</v-icon>Copy failed.
            </template>
            <template v-else-if="success">
              <v-icon class="mx-2">mdi-share-variant</v-icon>Copied! :)
            </template>
            <template v-else>
              <v-icon class="mx-2">mdi-share-variant</v-icon>Share your haiku.
            </template>
          </v-btn>
        </v-fade-transition>
      </template>
    </preview-dialog>
  </div>
</template>