<template>
  <div class="randomizer">
    <button @click="getRandomHero">Click for random hero</button>
  </div>
</template>

<script>
export default {
  name: 'randomizer',
  props: {
    getRandomHero: Function,
  },
};
</script>

<style>
.randomizer {
  padding-top: 30px;
  margin-bottom: 30px;
}
</style>
