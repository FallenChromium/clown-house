import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { OpenAPI } from "./client"

import "./assets/main.css";
OpenAPI.BASE = "http://localhost:8000"
const app = createApp(App);

app.use(router);

app.mount("#app");
