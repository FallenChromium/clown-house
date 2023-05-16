import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ModelSettingsView from "@/views/ModelSettingsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/objects",
    },
    {
      path: "/events",
      name: "events",
      component: () => import("@/views/CityEventsView.vue"),
    },
    {
      path: "/objects",
      name: "objects",
      component: () => import("@/views/CityObjectsView.vue"),
    },
    {
      path: "/objects/:id",
      name: "object",
      component: () => import("@/views/CityObjectView.vue"),
      props: route => ({ id: Number(route.params.id) })
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("@/views/ModelSettingsView.vue")
    },
    {
      path: "/objectTypes/:id",
      name: "objectType",
      component: () => import("@/views/CityObjectTypeView.vue"),
      props: route => ({ id: Number(route.params.id) }),
    },
    {
      path: "/eventTypes/:id",
      name: "eventType",
      component: () => import("@/views/CityEventTypeView.vue"),
      props: route => ({ id: Number(route.params.id) }),
    },    
    {
      path: "/objectOwners",
      name: "objectOwners",
      component: () => import("@/views/CityObjectOwnersView.vue"),
    },
    {
      path: "/objectOwners/:id",
      name: "objectOwner",
      component: () => import("@/views/CityObjectOwnerView.vue"),
      props: route => ({ id: Number(route.params.id) })
    },
    {
      path: "/events/:id",
      name: "event",
      component: () => import("@/views/CityEventView.vue"),
      props: route => ({ id: Number(route.params.id) })

    },
    {
      path: "/objectStats",
      name: "objectStats",
      component: () => import("@/views/CityObjectStatsView.vue") 
    },
    {
      path: "/objectStats/:id",
      name: "objectStat",
      component: () => import("@/views/CityObjectStatView.vue"),
      props: route => ({ id: Number(route.params.id) })
    }

  ],
});

export default router;
