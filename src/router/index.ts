import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/index",
      name: "index",
      component: () => import("../views/index.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/sharp",
      name: "sharp",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/SharpView.vue"),
    },
    {
      path: "/generate_image",
      name: "generate_image",
      component: () => import("../views/GenerateWxAvator.vue"),
    },
  ],
});

export default router;
