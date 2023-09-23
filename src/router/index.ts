import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/file",
      name: "file",
      component: () => import("../views/FileDemo.vue"),
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
