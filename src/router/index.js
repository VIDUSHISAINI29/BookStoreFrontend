import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path:'/',
         redirect:'/home'
      },
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
                     name: "bookDetails",
                     component: () => import("@/pages/Home/HomeBookDetail.vue"),
                     props: true,
                  },
               ],
              
            },
            {
               path: '/cart',
               name:'cart',
               component: () => import("@/pages/Cart.vue"),
            },
         ],
      },
   ],
});

export default router;
