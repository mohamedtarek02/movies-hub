<template>
  <base-spinner
    v-if="isLoading"
    class="base-spinner"
    blank="true"
  ></base-spinner>
  <header v-else>
    <nav>
      <h1>
        <router-link to="/" @click="fetchMovies">Movies Hub</router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/home" @click="fetchMovies">Home</router-link>
        </li>
        <li>
          <router-link to="create-movie">Create Movie</router-link>
        </li>
        <li>
          <base-button @click="logout" mode="flat">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/log-in");
    },
    async fetchMovies() {
      this.isLoading = true;
      await this.$store.dispatch("movies/fetchMovies");
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #480084;
  padding: 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}

header a {
  text-decoration: none;
  color: #a0a0a0;
  display: inline-block;
  padding: 0.5rem;
  font-weight: 600;
}

a:hover,
a.router-link-active {
  color: white;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

header nav {
  width: 99%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}

/*media*/
@media (min-width: 320px) and (max-width: 540px) {
  header nav {
    display: block;
  }
  h1 {
    margin-left: 7px;
  }
  header ul {
    justify-content: start;
  }
  header a {
    padding: 10px 1px;
  }
}
</style>
