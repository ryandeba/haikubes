<template>
  <div>
    <v-dialog v-model="openDialog" width="600">
      <v-card>
        <v-card-text class="pt-6">
          Are you sure you want to reroll the haikubes? Your current progress will be lost.
        </v-card-text>

        <v-card-actions>
          <v-checkbox v-model="dismissed" label="Don't warn me again."></v-checkbox>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="openDialog = false"
            >
            Cancel
          </v-btn>

            <v-btn
              color="green darken-1"
              text
              @click="[openDialog = false, $emit('reroll')]"
              >
              Reroll
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-list-item @click="onClick">
      <v-list-item-icon>
        <v-icon>mdi-dice-2</v-icon>
      </v-list-item-icon>
      <v-list-item-title>Reroll</v-list-item-title>
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: ["preventDialog"],

  data() {
    return {
      openDialog: false,
      dismissed: false,
    };
  },

  methods: {
    onClick() {
      if (this.preventDialog || this.dismissed) {
        return this.$emit("reroll");
      } else {
        return (
            this.openDialog = true
        );
      }
    },
  },
};
</script>

<style>
</style>
