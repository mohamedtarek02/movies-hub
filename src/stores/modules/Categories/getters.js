export default {
  getCategories(state) {
    return state.categories;
  },

  shouldCategoriesUpdate(state) {
    const lastFetch = state.lastCategoriesFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTime = new Date().getTime();
    (currentTime - lastFetch) / 1000;
    if ((currentTime - lastFetch) / 1000 > 2000) {
      return true;
    } else {
      return false;
    }
  },
};
