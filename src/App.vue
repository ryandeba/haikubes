<script>
import Cubes from "./words.json";
import Syllables from "./syllables.json";

export default {
  name: "Haikubes",

  components: {
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
        [
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        ],
        [undefined, undefined, undefined, undefined, undefined],
      ],

      pool: [],

      poolIndex: undefined,

      drawer: false
    };
  },

  computed: {
    phraseSyllables() {
      return this.phrases.map((phrase) => {
        return phrase
          .filter((poolIndex) => {
            return poolIndex != undefined;
          })
          .map((poolIndex) => {
            return Syllables[this.pool[poolIndex]];
          })
          .reduce((a, b) => {
            return a + b;
          }, 0);
      });
    },

    haiku() {
      return this.phrases.map((phrase) => {
        return phrase
          .filter((poolIndex) => {
            return poolIndex != undefined;
          })
          .map((poolIndex) => {
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
      });

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
        row.forEach((col, c) => {
          if (this.phrases[r][c] === this.poolIndex) {
            result = [r, c];
          }
        });
      });

      return result;
    },

    setPoolIndex(index) {
      this.poolIndex = index;
    },
  },

  beforeMount() {
    this.pool = this.throwDice();
  },
};
</script>

<template>
  <v-app>
    <v-app-bar
      color="deep-purple"
      dark
      app
      style="z-index: 7;"
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Haikubes</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      fixed
    >
      <v-list
        nav
        dense
      >
        <reset-button
          :preventDialog="
            phrases.flat().filter((w) => w !== undefined).length === 0
          "
          @reroll="[clearPhrases(), (pool = throwDice())]"
        ></reset-button>

        <preview :phrases="haiku"></preview>
      </v-list>
    </v-navigation-drawer>

    <v-main class="pink lighten-5">
      <v-container>
        <v-container
          class="pink lighten-5 mb-5"
        >
          <v-row
            v-for="(phrase, r) in phrases"
            :key="r"
            class="flex-nowrap"
            style="overflow-x:scroll;"
          >
            <v-col v-for="(spot, c) in phrase" :key="'spot_' + c" cols="auto">
              <drop-target
                @dropped="setPoolIndexInDropTarget([r, c])"
                @click.native="setPoolIndexInDropTarget([r, c])"
              >
                <word
                  v-if="pool[phrases[r][c]]"
                  :label="pool[phrases[r][c]]"
                  @drag:start="poolIndex = phrases[r][c]"
                ></word>
              </drop-target>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto" v-if="$vuetify.breakpoint.name !== 'xs'">
              <syllable-counter :requiredSyllables="r === 1 ? 7 : 5" :syllableCount="phraseSyllables[r]"></syllable-counter>
            </v-col>
          </v-row>
        </v-container>

        <drop-target
          @dropped="returnToPool"
          class="drop-target--naked"
          style="width: 100%"
        >
          <v-row>
            <template v-for="(word, i) in pool">
              <v-col :key="i" cols="4" md="3" lg="2" xl="1" v-if="!phrases.flat().includes(i)">
                <word
                  :label="word"
                  :selected="poolIndex == i"
                  @drag:start="poolIndex = i"
                  @drag:stop="poolIndex = undefined"
                  @tap="setPoolIndex(i)"
                ></word>
              </v-col>
            </template>
          </v-row>
        </drop-target>
      </v-container>
    </v-main>

    <url-preview></url-preview>
  </v-app>
</template>

<style scoped>
  .phrase {
    box-shadow: inset 0 0 5px 2px #ccc;
    border-radius: 3px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 12px;
    align-items: center;
  }
</style>
