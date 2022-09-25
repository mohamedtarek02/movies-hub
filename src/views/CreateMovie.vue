<template>
  <div class="container">
    <nav-bar></nav-bar>
    <base-background imageURL="url('./src/assets/movie.jpg')" />
    <base-card class="card">
      <h2>Cerate Movie</h2>
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
        <base-button type="submit" class="form-btn"> Add Movie </base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import movieForm from "../mixins/movieForm.js";
export default {
  mixins: [movieForm],
  data() {
    return {
      isFormValid: true,
      movieName: {
        val: null,
        isValid: true,
      },
      movieDesc: {
        val: null,
        isValid: true,
      },
      movieImg: {
        val: null,
        name: "",
        isValid: true,
      },
      movieGenre: {
        val: null,
        name: null,
        isValid: true,
      },
    };
  },

  methods: {
    async fetchMovies() {
      this.isLoading = true;
      await this.$store.dispatch("movies/fetchMovies");
      await this.$store.dispatch("categories/fetchCategories");
      this.isLoading = false;
    },

    submitMovieForm() {
      this.validation();

      if (!this.isFormValid) {
        return;
      }
      this.$store.dispatch("movies/createMovie", {
        name: this.movieName.val,
        description: this.movieDesc.val,
        image: this.movieImg.val,
        category_id: this.movieGenre.val,
      });
    },
  },
  created() {
    this.fetchMovies();
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
@media (min-width: 320px) and (max-width: 540px) {
  .card {
    top: 144px;
    padding: 10px 0 0px;
  }
  .select {
    margin-top: 10px;
  }
}
</style>
