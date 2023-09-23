import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "element-plus/dist/index.css";
// import "./assets/main.css";

const app = createApp(App);

app.directive("highlight", function (el) {
  const blocks = el.querySelectorAll("pre code");
  blocks.forEach((block: any) => {
    hljs.highlightBlock(block);
  });
});

app.use(router);

app.mount("#app");
