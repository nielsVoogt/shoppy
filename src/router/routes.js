const routes = [
  {
    path: "/store/:slug",
    name: "Customer",
    component: () => import("../views/Customer.vue"),
    beforeEnter: (to, from, next) => {
      console.log("to", to);
      console.log("from", from);
      console.log("next", next);
    },
  },
  {
    path: "/auth",
    component: () => import("../layouts/Auth.vue"),
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
      },
      {
        path: "/registration",
        name: "Registration",
        component: () => import("../views/Registration.vue"),
      },
      {
        path: "/reset-password",
        name: "ResetPassword",
        component: () => import("../views/ResetPassword.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "LandingPage",
    component: () => import("../views/LandingPage.vue"),
  },
  {
    path: "",
    component: () => import("../layouts/Main.vue"),
    children: [
      {
        path: "/reservations",
        name: "Reservations",
        component: () => import("../views/Reservations.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/settings",
        name: "Settings",
        component: () => import("../views/Settings.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "*",
    redirect: "/",
  },
];

export default routes;
