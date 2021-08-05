<template>
  <div class="search-input">
    <label>
      <span class="visually-hidden">Hero Name</span>
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Enter a hero name"
        @keydown.enter.prevent="triggerSearch"
      />
    </label>
    <button @click="triggerSearch">Search</button>
  </div>
</template>

<script>
export default {
  name: 'search-input',
  data() {
    return {
      searchTerm: '',
    };
  },
  methods: {
    triggerSearch() {
      if (this.searchTerm.length > 2) {
        this.handleSearch(this.searchTerm);
        this.searchTerm = '';
      }
    },
  },
  props: {
    handleSearch: Function,
  },
};
</script>

<style>
.search-input {
  margin-bottom: 0 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #ddd;
}
</style>
