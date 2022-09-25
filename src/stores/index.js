import { createStore } from "vuex";

import authModule from "./modules/auth/index.js";
import moviesModule from "./modules/movies/index.js";
import categoriesModule from "./modules/categories/index.js";

const store = createStore({
  modules: {
    movies: moviesModule,
    categories: categoriesModule,
    auth: authModule,
  },
});

export default store;
