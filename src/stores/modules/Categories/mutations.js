export default {
  setCategories(state, payload) {
    state.categories = payload;
  },
  filterMovies(state, payload) {
    state.movies = state.movies.filter(
      (movie) => movie.category_id === payload
    );
  },

  setLastCategoriesFetch(state) {
    state.lastCategoriesFetch = new Date().getTime();
  },
};
