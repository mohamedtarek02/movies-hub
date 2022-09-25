<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.7rem 0.6rem;
  font: inherit;
  background-color: #480084;
  border: 1px solid #480084;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 0.5rem;
  display: block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #1a0127;
}

.flat {
  background-color: transparent;
  color: white;
  font-weight: bols;
  border: none;
  display: inline-block;
  padding: 0.2rem;
}

.flat:hover {
  background-color: transparent;
}
</style>
