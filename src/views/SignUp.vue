<template>
  <base-background imageURL="url('./src/assets/movie.jpg')" />
  <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <base-card class="card">
    <base-spinner
      v-if="isLoading && !error"
      class="base-spinner"
    ></base-spinner>
    <auth-form
      showNameInputs
      buttonCaption="sign Up"
      @submitForm="signUp"
      v-else
    />
  </base-card>
</template>

<script>
import AuthForm from "../components/AuthForm.vue";
export default {
  components: {
    AuthForm,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async signUp(payload) {
      try {
        this.isLoading = true;
        await this.$store.dispatch("signUp", payload);
        this.isLoading = false;
        this.$router.replace("/home");
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
    },
    handleError() {
      this.error = null;
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.card {
  width: 50%;
  height: 445px;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1000;
}
</style>
