<script setup>


import{ useGlobalStore} from "@/stores/global.js"
const global = useGlobalStore();
import { useAuth0 } from '@auth0/auth0-vue';
import { ref } from "vue";

const profileHovered = ref(false);
const showLogout = ref(false);
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
   
    <div class="tw-w-full tw-z-10 tw-sticky tw-top-0 tw-flex tw-justify-between  tw-bg-yellow-600 tw-p-1 tw-px-6 tw-items-center">
        <router-link to="/home" class="">
            <img class="tw-w-14 tw-cursor-pointer  xxs-300:tw-h-10 xxs-300:tw-w-10 tw-h-14 tw-rounded-[50%]" src="/images/booksLogo.jpeg" alt="logo">
        </router-link>
        <div class="lg:tw-flex tw-gap-9 xxs-300:tw-hidden  tw-ml-40 tw-text-base">
            <div class="tw-flex tw-flex-col ">
                <router-link to="/home" class="tw-text-[#020933]  hover:tw-bg-[#020933] tw-rounded-tl-md  tw-rounded-tr-md hover:tw-text-white tw-py-[3px] tw-px-3 tw-cursor-pointer  tw-font-semibold tw-transition-colors tw-duration-200 tw-ease-in  ">Home</router-link>
                <span class="tw-bg-[#020933] tw-h-[2px]"></span>
            </div>
            <div class="tw-flex tw-flex-col">
                <router-link to="/profile" class="tw-text-[#020933] hover:tw-bg-[#020933] tw-rounded-tl-md  tw-rounded-tr-md hover:tw-text-white tw-py-[3px] tw-px-3   tw-cursor-pointer  tw-font-semibold tw-transition-colors tw-duration-200 tw-ease-in  ">Profile</router-link>
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
            <div v-if="profileHovered" @mouseenter="profileHovered = true" @mouseleave="profileHovered = false" class="tw-bg-white  tw-p-2 tw-rounded-md   tw-fixed  tw-shadow-2xl tw-right-1 tw-top-14 tw-w-[110px] tw-flex tw-flex-col tw-gap-2">
                <div>
                    <span class="tw-w-4 tw-h-4 tw-absolute  tw-bg-white tw-transform tw-rotate-45 -tw-top-2 tw-right-8"></span>
                </div>
                <div class="tw-flex tw-flex-col tw-gap-1">
                    <router-link to="/profile" class="tw-bg-gray-100 hover:tw-bg-gray-300 tw-transition-colors tw-duration-300 tw-p-1 tw-rounded-lg hover: tw-cursor-pointer">View Profile</router-link>
                <span @click="logout"  class="tw-bg-gray-100 hover:tw-bg-gray-300 tw-p-1 tw-transition-colors tw-duration-300 tw-rounded-lg tw-cursor-pointer">Logout</span>
                </div>
            </div>
        </div>
        <div class="tw-flex tw-gap-8">
           <div class="tw-relative">
            <RouterLink to="/cart" class="ri-shopping-cart-2-fill tw-cursor-pointer tw-text-[#020933] tw-text-4xl"></RouterLink>
            <span class="tw-block tw-absolute tw-top-0 tw-right-0 tw-w-4 tw-h-4 tw-rounded-[50%] tw-font-bold tw-bg-[#ffe19f] tw-text-[11px] tw-text-[#020933] tw-text-center">{{ global.numberOfBooks }}</span>
           </div>
          
            <span @mouseover="profileHovered= true" @mouseleave="profileHovered = false" class="tw-text-white tw-border-2 tw-border-[#020933]  tw-transition-all tw-duration-200 tw-cursor-pointer tw-border-2-[#020933] hover:tw-bg-[#ffe19f] tw-font-semibold hover:bShadow tw-p-[4px] tw-text-base tw-flex tw-justify-center tw-items-center hover:tw-shadow-whiteShadow tw-rounded-3xl tw-bg-[#ffe19f] hover:tw-text-[#020933] hover:tw-border-2-[#020933]"><img class="tw-w-8 tw-h-8 tw-rounded-[50%]" :src="global.profileImg" alt=""></span>
        </div>
    </div>
  
</template>