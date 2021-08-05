<template>
  <div class="character-card">
    <h1 class="character-card-title">{{ this.character.name }}</h1>
    <div class="character-card-container">
      <div class="character-card-img">
        <img
          :src="`${this.character.thumbnail.path}.${this.character.thumbnail.extension}`"
          :alt="`${this.character.name} profile image`"
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
};
</script>

<style>
.character-card-title {
  margin-bottom: 15px;
}

.character-card-container {
  display: flex;
}

.character-card-img {
  max-width: calc(33%);
  padding-right: 20px;
}

.character-card-img img {
  width: 100%;
  height: auto;
}
</style>
