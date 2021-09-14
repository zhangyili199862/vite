import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import axios from "axios";
import config from "./config/index";
const app = createApp(App);
axios.get(`${config.mockApi}/login`).then((res) => {
  console.log(res);
});
app.use(router);
app.use(ElementPlus);
app.mount("#app");
