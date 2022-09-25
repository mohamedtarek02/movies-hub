<template>
  <section>
    <h2>Page not found</h2>
    <p>
      This page could not be found - maybe check out all our
      <router-link to="/home">home</router-link>.
    </p>
  </section>
</template>

<style scoped>
section {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
