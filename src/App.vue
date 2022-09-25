<template>
  <RouterView />
</template>

<script>
export default {
  created() {
    this.$store.dispatch("autoLogin");
  },
};
</script>
<style scoped></style>
