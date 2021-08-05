<template>
  <div class="character-card">
    <h1 class="character-card-title">{{ this.character.name }}</h1>
    <div class="character-card-container">
      <div class="character-card-img-container">
        <button
          class="character-card-btn"
          @click="handleFavorite"
        >
          {{ this.isFavorite ? 'Drop' : 'Add'}} favorites
        </button>
        <img
          :src="`${this.character.thumbnail.path}.${this.character.thumbnail.extension}`"
          :alt="`${this.character.name} profile image`"
          class="character-card-img"
        />
      </div>
      <div v-if="this.character.description !== ''" class="character-card-bio">
        <h2>Character Biography</h2>
        <p>{{ this.character.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'character-card',
  props: {
    character: Object,
  },
  computed: {
    isFavorite() {
      return !!this.$store.state.favorites.find((x) => x.id === this.character.id);
    },
  },
  methods: {
    handleFavorite() {
      if (this.isFavorite) {
        this.$store.dispatch('removeFavorite', this.character.id);
      } else {
        this.$store.dispatch('addFavorite', this.character);
      }
    },
  },
};
</script>

<style>
.character-card-title {
  margin-bottom: 15px;
}

.character-card-container {
  display: flex;
}

.character-card-btn {
  margin-bottom: 15px;
}

.character-card-img-container {
  max-width: calc(33%);
  padding-right: 20px;
}

.character-card-bio {
  padding-top: 35px;
}

.character-card-img {
  min-width: 200px;
  width: 100%;
  height: auto;
}
</style>
