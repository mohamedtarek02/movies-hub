<template>
  <base-background imageURL="url('./src/assets/movies.png')" />
  <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <base-card class="card">
    <base-spinner v-if="isLoading" class="base-spinner"></base-spinner>
    <auth-form buttonCaption="Log In" @submitForm="logIn" v-else />
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
      error: null,
      isLoading: false,
    };
  },
  methods: {
    async logIn(payload) {
      try {
        this.isLoading = true;
        await this.$store.dispatch("logIn", payload);
        this.isLoading = false;
        this.$router.replace("/home");
      } catch (error) {
        this.error = error || "Network error";
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
  width: 400px;
  height: 400px;
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
