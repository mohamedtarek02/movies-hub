<template>
  <nav-bar></nav-bar>
  <base-spinner v-if="isLoading" class="base-spinner"></base-spinner>
  <section class="container" v-else>
    <the-genres
      :categories="categories"
      @filterMovies="filterMovies"
    ></the-genres>
    <movie-item
      v-for="movie in movies"
      :key="movie.id"
      :id="movie.id"
      :name="movie.name"
      :image="movie.image"
      :description="movie.description"
    ></movie-item>
    <h2 v-if="movies.length === 0" class="no-movies">no movies to show.</h2>
  </section>
</template>

<script>
import NavBar from "../components/layout/NavBar.vue";
import MovieItem from "../components/MovieItem.vue";

export default {
  components: {
    NavBar,
    MovieItem,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    movies() {
      return this.$store.getters["movies/getMovies"];
    },
    categories() {
      return this.$store.getters["categories/getCategories"];
    },
  },
  methods: {
    async fetchMovies() {
      try {
        this.isLoading = true;
        await this.$store.dispatch("movies/fetchMovies");
        await this.$store.dispatch("categories/fetchCategories");
        this.isLoading = false;
      } catch (error) {
        this.error = error || "Network error";
      }
    },
    async filterMovies(id) {
      this.isLoading = true;
      await this.$store.dispatch("movies/filterMovies", id);
      this.$router.push(`?genres=${id}`);
      this.isLoading = false;
    },
  },
  created() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.genres {
  display: block;
}
.no-movies {
  margin: auto;
  text-transform: capitalize;
}
.base-spinner {
  margin-top: 100px;
}
</style>
