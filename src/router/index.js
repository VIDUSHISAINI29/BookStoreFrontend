import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: "/",
         component: () => import("@/layout/AppLayout.vue"),
         children: [
            {
               path: "/home",
               name: "home",
               component: () => import("@/pages/Home/Home.vue"),
               children: [
                  {
                     path: ":uri",
                     name: "homeContent",
                     component: () => import("@/pages/Home/Content.vue"),
                     props: true,
                  },
               ],
            },
         ],
      },
   ],
});

export default router;
