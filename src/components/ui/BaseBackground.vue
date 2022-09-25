<template>
  <div class="background" :style="{ backgroundImage: imageURL }"></div>
  <div class="backdrop"></div>
</template>

<script>
export default {
  props: {
    imageURL: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.background {
  width: 100%;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
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
</style>
