<script setup>


import{ useGlobalStore} from "@/stores/global.js"
const global = useGlobalStore();
import { useAuth0 } from '@auth0/auth0-vue';


// function logout() {
//   auth0.logout({
//     logoutParams: {
//       returnTo: window.location.origin
//     }
//   }).then(() => {
//     router.push('/log-in'); // Or wherever you want to redirect after logout
//   }).catch((error) => {
//     console.log('Logout error:', error);
//   });

//   console.log('Logout function triggered');
// }



    const auth0 = useAuth0();

      function logout() {
        auth0.logout({ 
          logoutParams: { 
            returnTo: window.location.origin 
          } 
        });
      }
 
  
</script>
<template>
    <div class="tw-w-full tw-z-10 tw-sticky tw-top-0 tw-flex tw-justify-between col tw-bg-yellow-600 tw-p-1 tw-px-6 tw-items-center">
        <div class="">
            <img class="tw-w-14 tw-cursor-pointer tw-h-14 tw-rounded-[50%]" src="/images/booksLogo.jpeg" alt="logo">
        </div>
        <div class="tw-flex tw-gap-9 tw-ml-40 tw-text-base">
            <div class="tw-flex tw-flex-col ">
                <router-link to="/home" class="tw-text-[#020933]  hover:tw-bg-[#020933] tw-rounded-tl-md  tw-rounded-tr-md hover:tw-text-white tw-py-[3px] tw-px-3 tw-cursor-pointer  tw-font-semibold tw-transition-colors tw-duration-200 tw-ease-in  ">Home</router-link>
                <span class="tw-bg-[#020933] tw-h-[2px]"></span>
            </div>
            <div class="tw-flex tw-flex-col">
                <span class="tw-text-[#020933] hover:tw-bg-[#020933] tw-rounded-tl-md  tw-rounded-tr-md hover:tw-text-white tw-py-[3px] tw-px-3   tw-cursor-pointer  tw-font-semibold tw-transition-colors tw-duration-200 tw-ease-in  ">Services</span>
                <span class="tw-bg-[#020933] tw-h-[2px]"></span>
            </div>
            <div class="tw-flex tw-flex-col">
                <router-link to="/about-us" class="tw-text-[#020933] hover:tw-bg-[#020933] tw-rounded-tl-md  tw-rounded-tr-md hover:tw-text-white tw-py-[3px] tw-px-3 tw-cursor-pointer  tw-font-semibold tw-transition-colors tw-duration-200 tw-ease-in  ">About Us</router-link>
                <span class="tw-bg-[#020933] tw-h-[2px]"></span>
            </div>
            <div class="tw-flex tw-flex-col">
                <router-link to="/contact-us" class="tw-text-[#020933] hover:tw-bg-[#020933] tw-rounded-tl-md  tw-rounded-tr-md hover:tw-text-white tw-py-[3px] tw-px-3   tw-cursor-pointer  tw-font-semibold tw-transition-colors tw-duration-200 tw-ease-in">Contact Us</router-link>
                <span class="tw-bg-[#020933] tw-h-[2px]"></span>
            </div>
        </div>
        <div class="tw-flex tw-gap-8">
           <div class="tw-relative">
            <RouterLink to="/cart" class="ri-shopping-cart-2-fill tw-cursor-pointer tw-text-[#020933] tw-text-4xl"></RouterLink>
            <span class="tw-block tw-absolute tw-top-0 tw-right-0 tw-w-4 tw-h-4 tw-rounded-[50%] tw-font-bold tw-bg-[#ffe19f] tw-text-[11px] tw-text-[#020933] tw-text-center">{{ global.numberOfBooks }}</span>
           </div>
            <router-link @click="logout" to="/log-out" class="tw-text-white tw-border-2 tw-border-[#020933] tw-transition-all tw-duration-200 tw-cursor-pointer tw-border-2-[#020933] hover:tw-bg-[#ffe19f] tw-font-semibold hover:bShadow tw-p-0 tw-text-base tw-flex tw-justify-center tw-items-center tw-px-3 tw-rounded-3xl tw-bg-[#020933] hover:tw-text-[#020933] hover:tw-border-2-[#020933]">Logout</router-link>
        </div>
    </div>
</template>