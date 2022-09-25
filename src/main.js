import { createApp } from "vue";

import App from "./App.vue";
import router from "./router/index.js";
import store from "./stores/index.js";

import NavBar from "./components/layout/NavBar.vue";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseSpinner from "./components/ui/BaseSpinner.vue";
import BaseDialog from "./components/ui/BaseDialog.vue";
import BaseBackground from "./components/ui/BaseBackground.vue";
import TheGenres from "./components/TheGenres.vue";

import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(store);

app.component("nav-bar", NavBar);
app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("base-spinner", BaseSpinner);
app.component("base-dialog", BaseDialog);
app.component("base-background", BaseBackground);
app.component("the-genres", TheGenres);

app.mount("#app");
