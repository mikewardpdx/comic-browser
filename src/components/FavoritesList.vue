<template>
  <div>
    <h3>My Faves:</h3>
    <div v-if="favorites.length > 0">
      <ul class="favorites-list">
        <li
          v-for="(fav, i) in favorites"
          :key="`fav-${i}`"
          class="favorites-list-item"
        >
          <a
            href="#"
            @click.prevent="updateHero(fav)"
          >
            {{ fav.name }}
          </a>
          <button @click="removeFavorite(fav.id)">drop</button>
        </li>
      </ul>
    </div>
    <p v-else>You don't have any favorites at this time...</p>
  </div>
</template>

<script>
export default {
  name: 'favorites-list',
  props: {
    setActiveHero: Function,
  },
  computed: {
    favorites() {
      return this.$store.state.favorites;
    },
  },
  methods: {
    removeFavorite(id) {
      this.$store.dispatch('removeFavorite', id);
    },
    updateHero(fav) {
      this.setActiveHero(fav);
    },
  },
};
</script>

<style>
.favorites-list {
  padding: 0;
}

.favorites-list-item {
  list-style: none;
  margin-bottom: 15px;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}
</style>
