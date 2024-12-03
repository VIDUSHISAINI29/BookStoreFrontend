import { createRouter, createWebHistory } from "vue-router";
import { useAuth0 } from "@auth0/auth0-vue";


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
               meta: {requiresAuth: true},
               children: [
                  {
                     path: ":uri",
                     name: "bookDetails",
                     component: () => import("@/pages/Home/HomeBookDetail.vue"),
                     meta: {requiresAuth: true},
                     props: true,
                  },
               ],
              
            },
            {
               path: '/cart',
               name:'cart',
               component: () => import("@/pages/Cart.vue"),
               meta: {requiresAuth: true},
            },
            {
               path: '/payement-success',
               name:'success',
               component: () => import("@/pages/Success.vue"),
               
            },
            {
               path: '/payement-cancel',
               name:'cancel',
               component: () => import("@/pages/Cancel.vue"),
               
            },
            {
               path: '/contact-us',
               name:'contactUs',
               component: () => import("@/components/ContactUs.vue"),
               meta: {requiresAuth: true},
            },
            {
               path: '/about-us',
               name:'aboutUs',
               component: () => import("@/pages/AboutUs.vue"),
               meta: {requiresAuth: true},
            },
            {
               path: '/profile',
               name:'profile',
               component: () => import("@/pages/Profile.vue"),
               meta: {requiresAuth: true},
            },
           
         ],
         
      },
      {
         path: '/login',
         name:'login',
         component: () => import("@/pages/Login.vue"),
      },
      {
         path: '/log-out',
         name:'logout',
         component: () => import("@/pages/Logout.vue"),
      },
   ],
});


router.beforeResolve(async (to, from, next) => {
   const { isAuthenticated } = useAuth0();
   if(to.meta.requiresAuth && !isAuthenticated.value)
   {
      console.log('user is not true. redirecting to login...');
      next({name: "login"})
   }
   else{
      next();
   }
})

export default router;
