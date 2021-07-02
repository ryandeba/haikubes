<script>
import Cubes from "./words.json";
import Syllables from "./syllables.json";

export default {
  name: "Haikubes",

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
    }
  },

  methods: {
    throwDice() {
      let result = [];

      this.allDice.forEach((d) => {
        let randomIdx = Math.floor(Math.random() * d.length);
        result.push(d[randomIdx]);
      });

      result.sort(() => {
        return Math.random() < 0.5 ? -1 : 1;
      })

      return result;
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
    this.allDice = Cubes;
    this.pool = this.throwDice();
  },
};
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
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
              <span class="font-weight-bold" style="font-size:52px;color:lightgray;">
                {{ phraseSyllables[r] }}
              </span>

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
  </v-app>
</template>


