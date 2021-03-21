const routes = [
  {
    path: "/boek/:slug",
    name: "Customer",
    component: () => import("../views/Customer.vue"),
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
    meta: { requiresAuth: true },
    children: [
      {
        path: "/reservations",
        name: "Reservations",
        component: () => import("../views/Reservations.vue"),
      },
      {
        path: "/settings",
        name: "Settings",
        component: () => import("../views/Settings.vue"),
      },
    ],
  },
  {
    path: "*",
    redirect: "/",
  },
];

export default routes;
