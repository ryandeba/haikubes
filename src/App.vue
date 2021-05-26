<script>
export default {
  name: 'Foo',

  components: {
    phrase: require("./components/phrase").default,
    word: require("./components/word").default,
  },

  data() {
    return {
      phrase1: [{label: 'here'}, {label: 'we'}],
      phrase2: [],
      phrase3: [],

      pool: [],
    };
  },
};
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <phrase v-model="phrase1" :max-syllables="5"></phrase>
            <phrase v-model="phrase2" :max-syllables="7"></phrase>
            <phrase v-model="phrase3" :max-syllables="5"></phrase>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <word :label="'hello'"></word>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


