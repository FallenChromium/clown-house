import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import BlankLayout from "@/layouts/BlankLayout.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: { layout: AppLayout },
      redirect: "/objects",
    },
    {
      path: "/login",
      name: "login",
      meta: { layout: BlankLayout },
      component: LoginView,
    },
    {
      path: "/events",
      name: "events",
      meta: { layout: AppLayout },
      component: () => import("@/views/CityEventsView.vue"),
    },
    {
      path: "/objects",
      name: "objects",
      meta: { layout: AppLayout },
      component: () => import("@/views/CityObjectsView.vue"),
    },
    {
      path: "/objects/:id",
      name: "object",
      meta: { layout: AppLayout },
      component: () => import("@/views/CityObjectView.vue"),
      props: (route) => ({ id: Number(route.params.id) }),
    },
    {
      path: "/settings",
      name: "settings",
      meta: { layout: AppLayout },
      component: () => import("@/views/ModelSettingsView.vue"),
    },
    {
      path: "/objectTypes/:id",
      name: "objectType",
      meta: { layout: AppLayout },
      component: () => import("@/views/CityObjectTypeView.vue"),
      props: (route) => ({ id: Number(route.params.id) }),
    },
    {
      path: "/eventTypes/:id",
      name: "eventType",
      meta: { layout: AppLayout },
      component: () => import("@/views/CityEventTypeView.vue"),
      props: (route) => ({ id: Number(route.params.id) }),
    },
    {
      path: "/objectOwners",
      name: "objectOwners",
      meta: { layout: AppLayout },
      component: () => import("@/views/CityObjectOwnersView.vue"),
    },
    {
      path: "/objectOwners/:id",
      name: "objectOwner",
      meta: { layout: AppLayout },
      component: () => import("@/views/CityObjectOwnerView.vue"),
      props: (route) => ({ id: Number(route.params.id) }),
    },
    {
      path: "/events/:id",
      name: "event",
      meta: { layout: AppLayout },
      component: () => import("@/views/CityEventView.vue"),
      props: (route) => ({ id: Number(route.params.id) }),
    },
    {
      path: "/objectStats",
      name: "objectStats",
      meta: { layout: AppLayout },
      component: () => import("@/views/CityObjectStatsView.vue"),
    },
    {
      path: "/objectStats/:id",
      name: "objectStat",
      meta: { layout: AppLayout },
      component: () => import("@/views/CityObjectStatView.vue"),
      props: (route) => ({ id: Number(route.params.id) }),
    },
  ],
});

export default router;
