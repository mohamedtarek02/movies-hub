import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://test-api.storexweb.com",
});

export default {
  async fetchCategories(context) {
    if (!context.getters.shouldCategoriesUpdate) {
      return;
    }
    const token = context.rootGetters.token;
    const response = await axiosInstance.get("/api/category", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const responseData = await response.data;

    context.commit("setCategories", responseData.message);
    context.commit("setLastCategoriesFetch");
  },
};
