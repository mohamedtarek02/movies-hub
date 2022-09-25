<template>
  <base-background imageURL="url('./src/assets/movie.jpg')" />
  <div class="container">
    <base-card class="card">
      <base-spinner v-if="isLoading" class="base-spinner"></base-spinner>
      <div class="content" v-else>
        <h2>Edit Movie</h2>
        <form @submit.prevent="submitMovieForm">
          <div class="form-control">
            <label for="movieName">Movie Name</label>
            <input
              type="text"
              id="movieName"
              v-model.trim="movieName.val"
              @input="clearValidity('movieName')"
            />
            <div class="error-message-con">
              <span v-if="!movieName.isValid" class="error-message"
                >Movie name is required.</span
              >
            </div>
          </div>
          <div class="form-control">
            <label for="movieDesc">Movie description</label>
            <input
              type="text"
              id="movieDesc"
              v-model.trim="movieDesc.val"
              @input="clearValidity('movieDesc')"
            />
            <div class="error-message-con">
              <span v-if="!movieDesc.isValid" class="error-message"
                >Movie description is required.</span
              >
            </div>
          </div>
          <div class="select">
            <div class="form-control">
              <the-genres
                :categories="categories"
                @filterMovies="generId"
                class="geners"
              ></the-genres>
              <span>* {{ movieGenre.name }} </span>
              <div class="error-message-con">
                <span v-if="!movieGenre.isValid" class="error-message"
                  >Movie genre is required.</span
                >
              </div>
            </div>
            <div class="form-control">
              <label for="img" class="img-label"
                >{{ "Upload image" || img.val }}
                <input
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  class="img-inp"
                  @change="imgVal"
                />
                <i class="fa-sharp fa-solid fa-paperclip"></i>
              </label>
              <span>{{ movieImg.name }}</span>
              <div class="error-message-con">
                <span v-if="!movieImg.isValid" class="error-message"
                  >Movie image is required.</span
                >
              </div>
            </div>
          </div>
          <base-button type="submit" class="form-btn">
            confirm Edits
          </base-button>
        </form>
      </div>
    </base-card>
  </div>
</template>

<script>
import movieForm from "../mixins/movieForm.js";
export default {
  mixins: [movieForm],
  props: {
    id: {
      type: String,
      requires: true,
    },
  },

  methods: {
    async preDefineMovieInfo() {
      this.isLoading = true;
      await this.$store.dispatch("movies/fetchMovies");
      await this.$store.dispatch("categories/fetchCategories");
      const movies = await this.$store.getters["movies/getMovies"];
      const categories = await this.$store.getters["categories/getCategories"];
      this.isLoading = false;
      const selectedMovie = movies.find((movie) => movie.id == this.id);
      this.movieName.val = selectedMovie.name;
      this.movieImg.val = selectedMovie.image;
      this.movieDesc.val = selectedMovie.description;
      this.movieGenre.val = selectedMovie.category_id;

      // predefin category name
      const chosenCategory = categories.find(
        (cat) => cat.id === selectedMovie.category_id
      );

      this.movieGenre.name = chosenCategory.name;
    },

    submitMovieForm() {
      this.validation();

      if (!this.isFormValid) {
        return;
      }
      this.$store.dispatch("movies/updateMovie", {
        id: this.id,
        name: this.movieName.val,
        description: this.movieDesc.val,
        image: this.movieImg.val,
        category_id: this.movieGenre.val,
      });
    },
  },
  created() {
    this.preDefineMovieInfo();
  },
};
</script>

<style scoped>
.card {
  width: 50%;
  height: 490px;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 45px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1000;
  padding: 10px 0 30px;
}
h2 {
  text-align: center;
  margin: 1px 0;
  text-transform: capitalize;
}
.select {
  display: flex;
  justify-content: space-between;
  margin-top: -30px;
  margin-bottom: 50px;
}
.img-label {
  cursor: pointer;
  border: 1px solid white;
  padding: 5px 7px;
  color: rgb(160 160 160);
}
.img-inp {
  display: none;
}
.geners {
  margin: -21px -34px;
}
.form-btn {
  width: 100%;
}
.error-message-con {
  white-space: nowrap;
}
@media (min-width: 320px) and (max-width: 480px) {
  .card {
    top: 120px;
    padding: 10px 0 0px;
  }
  .select {
    margin-top: 10px;
  }
}
</style>
