<template>
  <div id="app">
    <div class="sidebar">
      <search-input :handleSearch="this.handleSearch" />
      <randomizer :getRandomHero="getRandomHero" />
      <favorites-list :setActiveHero="setActiveHero"></favorites-list>
    </div>
    <div class="results">
      <div v-if="isLoading">
        <h1>Loading...</h1>
      </div>
      <div v-if="hasError">
        <h1>Something has gone wrong...</h1>
      </div>
      <div v-if="hasResult">
        <character-card :character="this.result" />
      </div>
      <div v-if="!hasError && !isLoading && hasSearched && !hasResult">
        <h1>Sorry, no results for: {{ this.searchTerm }}</h1>
      </div>
      <div v-if="!hasSearched">
        <h1>Search for a character or try your luck the randomizer</h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import md5 from './utils/md5';

const alphaString = 'abcdefghijklmnopqrstuvwxyz';

export default {
  data() {
    return {
      searchTerm: '',
      isLoading: false,
      hasError: false,
      hasResult: false,
      hasSearched: false,
      result: null,
    };
  },
  methods: {
    fetchSuperheroes(apiParams, shouldRandomize) {
      this.isLoading = true;
      this.hasSearched = true;
      this.hasError = false;
      this.hasResult = false;

      const signature = md5(
        `1${process.env.VUE_APP_MARVEL_PRIVATE_KEY}${process.env.VUE_APP_MARVEL_PUBLIC_KEY}`,
      );
      const route = 'https://gateway.marvel.com/v1/public/characters';

      axios
        .get(route, {
          params: {
            ...apiParams,
            ts: '1',
            apikey: process.env.VUE_APP_MARVEL_PUBLIC_KEY,
            hash: signature,
          },
        })
        .then((res) => {
          const {
            data: {
              data: { results },
            },
          } = res;
          this.isLoading = false;
          this.hasResult = results.length > 0;

          if (shouldRandomize) {
            this.result = results[this.getRandomInt(results.length - 1)];
          } else {
            this.result = results[0]; // eslint-disable-line prefer-destructuring
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.hasError = true;
          this.hasResult = false;
        });
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    handleSearch(val) {
      this.searchTerm = val;
      this.fetchSuperheroes({ name: val }, false);
    },
    getRandomHero() {
      const randoChar = alphaString.charAt(this.getRandomInt(alphaString.length - 1));
      this.fetchSuperheroes({ nameStartsWith: randoChar }, true);
    },
    setActiveHero(hero) {
      this.$nextTick(() => {
        this.result = hero;
      });
    },
  },
};
</script>

<style>
html,
body,
h1,
h2 {
  padding: 0;
  margin: 0;
}

.visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.sidebar {
  max-width: 18vw;
  min-width: 18vw;
  padding: 30px 15px;
  border: 1px solid #ddd;
}

.results {
  padding: 30px 15px;
}

#app {
  display: flex;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
