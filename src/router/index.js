import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LogIn from "../views/LogIn.vue";
import store from "../stores/index.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: HomeView, meta: { requiresAuth: true } },
    {
      path: "/log-in",
      name: "logIn",
      component: LogIn,
    },
    {
      path: "/sign-up",
      name: "signUp",
      component: () => import("../views/SignUp.vue"),
    },
    {
      path: "/create-movie",
      name: "createMovie",
      component: () => import("../views/CreateMovie.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/edit-movie/:id",
      name: "editMovie",
      props: true,
      component: () => import("../views/EditMovie.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/:notFound(.*)",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isLogged) {
    next("/log-in");
  } else if (to.meta.requiresUnauth && store.getters.isLogged) {
    next("/home");
  } else {
    next();
  }
});

export default router;
