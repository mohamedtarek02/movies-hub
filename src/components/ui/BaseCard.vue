<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding-bottom: 0.3rem;
}
/* Media */
@media (min-width: 320px) and (max-width: 480px) {
  .card {
    width: 95% !important;
  }
}
@media (min-width: 480px) and (max-width: 768px) {
  .card {
    width: 90% !important;
  }
}
@media (min-width: 768px) and (max-width: 1025px) {
  .card {
    width: 80% !important;
  }
}
</style>
