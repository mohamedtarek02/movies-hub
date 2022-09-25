<template>
  <div class="item">
    <div class="image-con">
      <div class="icons">
        <span class="icon-con" @click="editMovie(id)">
          <i class="fa-solid fa-pen"></i>
        </span>
        <span class="icon-con" @click="deleteMovie(id)">
          <i class="fa-solid fa-trash delete-icon"></i>
        </span>
      </div>
      <div
        class="image"
        :style="{ backgroundImage: `url(${imageUrl})` }"
        @click="showDetails"
      ></div>
    </div>
    <div class="details-con">
      <h3 class="movie-name">{{ name }}</h3>
      <p class="movie-desc">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    warn: {
      type: String,
      required: false,
      default: false,
    },
  },
  computed: {
    imageUrl() {
      return "https://test-api.storexweb.com/" + this.image;
    },
  },
  methods: {
    editMovie(id) {
      this.$router.push("/edit-movie/" + id);
    },
    deleteMovie(id) {
      const text = "Yor are about to delete this movie, are you sure?";
      if (confirm(text) === true) {
        this.$store.dispatch("movies/deleteMovie", id);
      } else {
        return;
      }
    },
  },
};
</script>

<style scoped>
.item {
  background-color: black;
  height: 300px;
  width: 23%;
  margin: 20px 1%;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}
.image-con {
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.details-con {
  height: 60px;
  text-align: center;
}

.image {
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}

.icons {
  position: absolute;
  right: 10px;
}
.icon-con {
  display: inline-block;
  width: 28px;
  height: 28px;
  background-color: #232222;
  border-radius: 50%;
  position: relative;
  margin: 4px 3px;
}
i {
  position: absolute;
  display: inline-block;
  top: 7px;
  left: 8px;
  margin: 0px auto;
}
i:hover {
  scale: 1.1;
}
.delete-icon {
  color: #ff1010;
}

.movie-name {
  margin: 0;
}
.movie-desc {
  margin: 0;
}
/* Media */
@media (min-width: 320px) and (max-width: 480px) {
  .item {
    width: 96%;
  }
}
@media (min-width: 480px) and (max-width: 768px) {
  .item {
    width: 48%;
  }
}
@media (min-width: 768px) and (max-width: 1025px) {
  .item {
    width: 31%;
  }
}
</style>
