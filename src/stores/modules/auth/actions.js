import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://test-api.storexweb.com",
});

export default {
  async signUp(context, payload) {
    const { data } = await axiosInstance({
      method: "post",
      url: "/api/register",
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
      },
    });

    if (data.status === "failed") {
      const error = new Error(data.message.email || "Failed to authenticate.");
      throw error;
    }

    const token = data.authorisation.token;

    localStorage.setItem("token", token);

    context.commit("setUser", token);
  },

  async logIn(context, payload) {
    const { data } = await axiosInstance({
      method: "post",
      url: "/api/login",
      data: {
        email: payload.email,
        password: payload.password,
      },
    });

    if (data.status === "error") {
      const error = new Error(data.message || "Failed to authenticate.");
      throw error;
    }

    const token = data.authorisation.token;

    localStorage.setItem("token", token);

    context.commit("setUser", token);
  },

  autoLogin(context) {
    const token = localStorage.getItem("token");

    if (token) {
      context.commit("setUser", token);
    }
  },

  logout(context) {
    localStorage.removeItem("token");

    context.commit("setUser", {
      token: null,
    });
  },
};
