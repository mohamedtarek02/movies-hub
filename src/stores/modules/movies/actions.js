import axios from "axios";
const token = localStorage.getItem("token");
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = "https://test-api.storexweb.com";
axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;

export default {
  async fetchMovies(context) {
    const { data } = await axiosInstance.get("/api/movies");
    context.commit("setMovies", data.message);

    if (data.status === "failed") {
      const error = new Error(data.message || "Failed to fetch movies.");
      throw error;
    }
  },

  async filterMovies(context, payload) {
    await context.dispatch("fetchMovies");
    context.commit("filterMovies", payload);
  },

  async createMovie(context, payload) {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });

    for (const value of formData.values()) {
      console.log(value);
    }
    await axiosInstance({
      headers: {
        ["Content-Type"]: "multipart/form-data",
      },
      method: "post",
      url: "/api/movies/",
      data: formData,
    });

    context.commit("createMovie", payload);
  },

  

  async updateMovie(context, payload) {
    const token = context.rootGetters.token;

    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });

    for (const value of formData.values()) {
      console.log(value);
    }
    await axiosInstance({
      headers: {
        ["Content-Type"]: "multipart/form-data",
      },
      method: "put",
      url: "/api/movies/" + payload.id,
      data: formData,
    });

    context.commit("updateMovie", payload);
  },

  deleteMovie(context, payload) {
    const token = context.rootGetters.token;
    axiosInstance.delete("/api/movies/" + payload);
    context.commit("deleteMovie", payload);
  },
};
