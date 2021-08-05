import Vue from 'vue';
import App from './App.vue';

import SearchInput from './components/SearchInput.vue';
import CharacterCard from './components/CharacterCard.vue';
import Randomizer from './components/Randomizer.vue';

import store from './store';

Vue.component(SearchInput.name, SearchInput);
Vue.component(Randomizer.name, Randomizer);
Vue.component(CharacterCard.name, CharacterCard);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
