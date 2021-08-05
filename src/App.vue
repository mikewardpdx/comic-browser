<template>
  <div id="app">
    <div class="sidebar">
      <search-input :handleSearch="this.handleSearch" />
      <randomizer :getRandomHero="getRandomHero" />
    </div>
    <div class="results">
      <div v-if="isLoading">
        <h1>Loading...</h1>
      </div>
      <div v-else-if="hasError">
        <h1>Something has gone wrong...</h1>
      </div>
      <div v-else-if="(hasResult && results.length <= 0)">
        <h1>Sorry, no results for: {{ this.searchTerm }}</h1>
      </div>
      <div v-else-if="hasResult">
        <character-card :character="this.results[0]" />
      </div>
      <div v-else>
        <h1>Search for a character or try your luck the randomizer</h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import md5 from './utils/md5';

const alphaNumeric = '0123456789abcdefghijklmnopqrstuvwxyz';

export default {
  data() {
    return {
      searchTerm: '',
      isLoading: false,
      hasError: false,
      hasResult: false,
      results: [],
    };
  },
  methods: {
    fetchSuperheroes(apiParams, shouldRandomize) {
      this.isLoading = true;
      this.hasError = false;
      this.hasResult = false;

      const signature = md5(
        `1${process.env.VUE_APP_MARVEL_PRIVATE_KEY}${process.env.VUE_APP_MARVEL_PUBLIC_KEY}`,
      );
      const route = 'http://gateway.marvel.com/v1/public/characters';

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
          this.isLoading = false;
          this.hasResult = true;
          const {
            data: {
              data: { results },
            },
          } = res;

          if (shouldRandomize) {
            this.results = [results[this.getRandomInt(results.length - 1)]];
          } else {
            this.results = results;
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
      const randoChar = alphaNumeric.charAt(this.getRandomInt(alphaNumeric.length - 1));
      this.fetchSuperheroes({ nameStartsWith: randoChar }, true);
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
