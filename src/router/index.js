import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";
import { store } from "@/store/index.js";

const fb = require("@/firebaseConfig.js");

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isUserAuth;

  console.log("to", to);
  console.log("from", from);

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
