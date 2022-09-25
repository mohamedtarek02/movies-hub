export default {
  setMovies(state, payload) {
    state.movies = payload;
  },
  filterMovies(state, payload) {
    state.movies = state.movies.filter(
      (movie) => movie.category_id === payload
    );
  },
  createMovie(state, payload) {
    state.movies.push(payload);
  },

  updateMovie(state, payload) {
    const movie = state.movies.find((movie) => movie.id == +payload.id);
    movie.name = payload.name;
    movie.image = payload.image;
    movie.description = payload.description;
    movie.category_id = payload.category_id;
  },
  deleteMovie(state, payload) {
    state.movies = state.movies.filter((movie) => movie.id !== payload);
  },
};
