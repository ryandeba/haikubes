<script>
import Cubes from "./words.json";
import Syllables from "./syllables.json";

export default {
  name: "Haikubes",

  components: {
    phrase: require("./components/phrase").default,
    word: require("./components/word").default,
    "drop-target": require("./components/drop-target").default,
    "syllable-counter": require("./components/SyllableCounter").default,
    "reset-button": require("./components/reset-button").default,
    preview: require("./components/preview").default,
    "url-preview": require("./components/url-preview").default,
  },

  data() {
    return {
      phrases: [
        [undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined],
      ],

      pool: [],

      poolIndex: undefined,
    };
  },

  computed: {
    phraseSyllables() {
      return this.phrases.map(phrase => {
        return phrase
          .filter(poolIndex => {
            return poolIndex != undefined;
          })
          .map(poolIndex => {
            return Syllables[this.pool[poolIndex]];
          })
          .reduce((a, b) => {
            return a + b;
          }, 0);
      });
    },

    haiku() {
      return this.phrases.map(phrase => {
        return phrase
          .filter(poolIndex => {
            return poolIndex != undefined;
          })
          .map(poolIndex => {
            return this.pool[poolIndex];
          })
          .join(" ");
      });
    },
  },

  methods: {
    throwDice() {
      let result = [];

      Cubes.forEach((d) => {
        let randomIdx = Math.floor(Math.random() * d.length);
        result.push(d[randomIdx]);
      });

      result.sort(() => {
        return Math.random() < 0.5 ? -1 : 1;
      })

      return result;
    },

    clearPhrases() {
      for (let p = 0; p < this.phrases.length; p++) {
        for (let w = 0; w < this.phrases[p].length; w++) {
          this.$set(this.phrases[p], w, undefined);
        }
      }
    },

    setPoolIndexInDropTarget(target) {
      let [r, c] = target;
      let blockAtTarget = this.phrases[r][c];
      let activeBlockCoords = this.getPositionOfActivePoolIndex(this.poolIndex);

      if (activeBlockCoords) {
        let [r_existing, c_existing] = activeBlockCoords;
        this.$set(this.phrases[r_existing], c_existing, blockAtTarget);
      }

      this.$set(this.phrases[r], c, this.poolIndex);
    },

    returnToPool() {
      let activeBlockCoords = this.getPositionOfActivePoolIndex(this.poolIndex);

      if (activeBlockCoords) {
        let [r_existing, c_existing] = activeBlockCoords;
        this.$set(this.phrases[r_existing], c_existing, undefined);
      }
    },

    getPositionOfActivePoolIndex() {
      let result;

      this.phrases.forEach((row, r) => {
        row.forEach((col, c)  => {
          if (this.phrases[r][c] === this.poolIndex) {
            result = [r, c];
          }
        })
      })

      return result;
    }
  },

  beforeMount() {
    this.pool = this.throwDice();
  },
};
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-container class="d-flex flex-column align-center white elevation-5 rounded-l-lg" style="width:50px;position:fixed;right:0;top:75%;">
          <reset-button :preventDialog="phrases.flat().filter(w => w !== undefined).length === 0" @reroll="[clearPhrases(), pool = throwDice()]"></reset-button>
          <preview :phrases="haiku"></preview>
        </v-container>
        <v-row>
          <v-col>
            <phrase v-for="(phrase, r) in phrases" :key="r" :value="phrase" class="d-flex align-center justify-space-between">
              <div class="d-flex">
                <drop-target
                  v-for="(spot, c) in phrase"
                  :key="'spot_' + c"
                  @dropped="setPoolIndexInDropTarget([r, c])"
                >
                  <word
                    v-if="pool[phrases[r][c]]"
                    :label="pool[phrases[r][c]]"
                    @drag:start="poolIndex = phrases[r][c]"
                  ></word>
                </drop-target>
              </div>
              <syllable-counter :requiredSyllables="r === 1 ? 7 : 5" :syllableCount="phraseSyllables[r]"></syllable-counter>

            </phrase>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <drop-target
              @dropped="returnToPool"
              class="d-flex flex-wrap justify-space-between"
              style="width: 100%;"
            >
              <template v-for="(word, i) in pool">
                <word
                  v-if="!phrases.flat().includes(i)"
                  :key="i"
                  :label="word"
                  @drag:start="poolIndex = i"
                  @drag:stop="poolIndex = undefined"
                ></word>
              </template>
            </drop-target>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <url-preview></url-preview>
  </v-app>
</template>


