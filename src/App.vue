<script>
import Cubes from "./words.json"

export default {
  name: 'Haikubes',

  components: {
    phrase: require("./components/phrase").default,
    word: require("./components/word").default,
    "drop-target": require("./components/drop-target").default,
  },

  data() {
    return {
      phrases: [
        [undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined],
      ],

      allDice: [],
      pool: [],

      selectedWord: undefined,
    };
  },

  methods: {
    throwDice() {
      let result = [];

      this.allDice.forEach(d => {
        let randomIdx = Math.floor(Math.random() * d.length);
        result.push(d[randomIdx]);
      });

      return result;
    },

    placeSelectedWordInDropTarget(location) {
      let [r, c] = location;

      this.$set(this.phrases[r], c, this.selectedWord);
    }
  },

  beforeMount() {
    this.allDice = Cubes;
    this.pool = this.throwDice();
  }

};
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <phrase
              v-for="(phrase, r) in phrases"
              :key="r"
              :value="phrase"
            >
              <drop-target
                v-for="(spot, c) in phrase"
                :key="'spot_' + c"
                @dropped="placeSelectedWordInDropTarget([r, c])"
                @drag:start="selectedWord = word"
                @drag:stop="selectedWord = undefined"
              >
                <word
                  v-if="phrases[r][c]"
                  :label="phrases[r][c]"
                ></word>
              </drop-target>
            </phrase>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="d-flex flex-wrap justify-space-between">
            <word
              v-for="(word, i) in pool"
              :key="i"
              :label="word"
              @drag:start="selectedWord = word"
              @drag:stop="selectedWord = undefined"
            ></word>
          </v-col>
        </v-row>

      </v-container>
    </v-main>
  </v-app>
</template>


