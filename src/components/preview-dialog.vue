<script>
  export default {
    props: {
      phrases: {
        type: Array
      },

      fromURL: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        openDialog: false,
      };
    },
  }
</script>

<template>
  <v-dialog v-model="openDialog" fullscreen :transition="false">
    <v-card tile class="fill-height" v-if="openDialog">
      <v-card-text
        class="fill-height d-flex flex-column align-center justify-center"
        style="overflow: hidden;"
      >
        <v-btn
          icon
          @click="openDialog = false"
          style="position: fixed; top: 0px; right: 0px;"
          class="ma-2"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <div
          v-for="(p, i) in phrases"
          :key="i"
          class="text-h1"
          style="white-space: pre;"
        >
          <span
            v-for="(w, wordIndex) in p.split(' ')"
            :key="'wordIndex' + wordIndex"
            style="display: inline-block;"
            v-anime="{
              rotate: [$anime.random(-120, 120), 0],
              duration: $anime.random(800, 1600),
              delay: $anime.random(0, 400),
              opacity: [0, 1],
              scale: [$anime.random(0, 4), 1],
              loop: false,
            }"
          >{{ w }} </span>
        </div>
        <slot name="shareURL"></slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
