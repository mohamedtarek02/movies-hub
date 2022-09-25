<template>
  <section>
    <div class="backdrop" v-if="showGenres" @click="showGenres = false"></div>

    <div class="container">
      <div class="genres" @click="toggleGenres">
        <span :style="{ color: showGenres ? 'white' : '#a0a0a0' }">Genres</span>
        <i
          :class="{
            'fa-solid fa-caret-down': !showGenres,
            'fa-solid fa-caret-up': showGenres,
          }"
        ></i>
      </div>
      <div v-if="showGenres" class="drop-down-list">
        <div
          v-for="category in categories"
          :key="category.id"
          @click="filterMovies(category.id, category.name)"
        >
          <span>{{ category.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showGenres: false,
      icon: "fa-solid fa-caret-down",
    };
  },
  methods: {
    toggleGenres() {
      this.showGenres = !this.showGenres;
    },
    filterMovies(id, name) {
      this.showGenres = false;
      this.$emit("filterMovies", id, name);
    },
  },
};
</script>

<style scoped>
section {
  width: 100%;
}
.container {
  cursor: pointer;
  z-index: 100;
  position: relative;
  margin: 21px 36px;
  padding: 5px 7px;
  display: block;
  border: 1px solid white;
  width: 73px;
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
}

.genres:hover {
  color: white;
}
.genres i {
  margin-left: 6px;
}

.drop-down-list {
  background-color: rgba(75, 75, 75, 0.6);
  position: absolute;
  top: 34px;
  left: -1.5px;
  padding: 4px 10px 5px 13px;
  border: 1px solid rgb(119, 119, 119);
  white-space: nowrap;
  list-style: none;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 240px;
}
.drop-down-list div {
  color: #a0a0a0;
  margin: 2px 0px;
  display: inline-block;
  width: 80px;
}
.drop-down-list div:hover {
  color: white;
}
</style>
