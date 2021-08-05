import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favorites: [],
  },
  mutations: {
    ADD_FAVORITE(state, fav) {
      if (!state.favorites.find((x) => x.id === fav.id)) {
        state.favorites.push(fav);
      }
    },
    REMOVE_FAVORITE(state, id) {
      state.favorites = state.favorites.filter((x) => x.id !== id);
    },
  },
  actions: {
    addFavorite({ commit }, fav) {
      commit('ADD_FAVORITE', fav);
    },
    removeFavorite({ commit }, id) {
      commit('REMOVE_FAVORITE', id);
    },
  },
  modules: {
  },
});
