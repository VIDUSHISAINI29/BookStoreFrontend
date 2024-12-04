<script setup>


import{ useGlobalStore} from "@/stores/global.js"
const global = useGlobalStore();
import { useAuth0 } from '@auth0/auth0-vue';
import { ref } from "vue";

const sidebarTransform = ref('tw-translate-x-[100%] tw-hidden');
const overlayTransform = ref('tw-translate-x-[-105%] ');
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
function makeSidebarClass(){
    sidebarTransform.value = 'tw-translate-x-[0%] tw-flex '
    console.log('make clicked');
    overlayTransform.value = 'tw-translate-x-[0%] tw-flex'
}
function disturbSidebarClass(){
    sidebarTransform.value = 'tw-translate-x-[100%] tw-hidden'
    console.log('disturbclicked');
    overlayTransform.value = 'tw-translate-x-[-105%]'
}
  
</script>
<template>
   
    <div class="tw-w-full tw-z-10 tw-sticky tw-p-1 tw-top-0 tw-flex tw-justify-between  tw-bg-yellow-600 md:tw-px-6  tw-items-center">
        
      
       
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
        <div class="tw-flex xxs-300:tw-gap-1 md:tw-gap-8">
           <div class="tw-relative">
            <RouterLink to="/cart" class="ri-shopping-cart-2-fill tw-cursor-pointer tw-text-[#020933] tw-text-4xl"></RouterLink>
            <span class="tw-block tw-absolute tw-top-0 tw-right-0 tw-w-4 tw-h-4 tw-rounded-[50%] tw-font-bold tw-bg-[#ffe19f] tw-text-[11px] tw-text-[#020933] tw-text-center">{{ global.numberOfBooks }}</span>
           </div>
           <i @click="makeSidebarClass" class="ri-menu-3-line lg:tw-hidden tw-flex tw-cursor-pointer tw-text-[#020933] tw-font-semibold tw-text-4xl"></i>
          
            <span @mouseover="profileHovered= true" @mouseleave="profileHovered = false" class="tw-text-white xxs-300:tw-hidden lg:tw-flex tw-border-2 tw-border-[#020933]  tw-transition-all tw-duration-200 tw-cursor-pointer tw-border-2-[#020933] hover:tw-bg-[#ffe19f] tw-font-semibold hover:bShadow tw-p-[4px] tw-text-base tw-flex tw-justify-center tw-items-center hover:tw-shadow-whiteShadow tw-rounded-3xl tw-bg-[#ffe19f] hover:tw-text-[#020933] hover:tw-border-2-[#020933]"><img class="tw-w-8 tw-h-8 tw-rounded-[50%]" :src="global.profileImg" alt=""></span>
        </div>
    </div>
    <div class="tw-w-full tw-fixed tw-top-0 tw-flex tw-z-20">
            <div :class="['tw-absolute tw-top-0 tw-right-0 tw-transition-transform tw-duration-500 tw-bg-white tw-transform tw-w-[70%]  tw-h-screen tw-flex tw-flex-col tw-gap-4', sidebarTransform]">
                <div class="tw-w-full tw-flex tw-justify-between tw-items-center tw-h-12 tw-shadow-2xl tw-p-1 tw-bg-white">
                    <img @click="disturbSidebarClass" class="tw-w-14 tw-cursor-pointer  xxs-300:tw-h-10 xxs-300:tw-w-10 tw-h-14 tw-rounded-[50%]" src="/images/booksLogo.jpeg" alt="logo">
                    <i @click="disturbSidebarClass"
                 
                  class="ri-close-line tw-cursor-pointer tw-text-3xl tw-font-semibold tw-text-[#020933]"></i>
                </div>
                <div class=" tw-flex tw-flex-col tw-w-full tw-items-center  tw-gap-3">
                   <div class="tw-w-[96%] tw-shadow-xl tw-flex tw-justify-center tw-p-2 tw-bg-gray-200 tw-rounded-md">
                    <router-link @click="disturbSidebarClass" to="/home" class="tw-cursor-pointer tw-w-28 tw-text-center tw-p-1 tw-font-semibold tw-text-base hover:tw-bg-[#020933] hover:tw-text-white tw-transition-colors tw-duration-500 tw-rounded-tr-md tw-rounded-tl-md tw-bg-yellow-600">Home</router-link>
                   </div>
                   <div  class="tw-w-[96%] tw-shadow-xl tw-flex tw-justify-center tw-p-2 tw-bg-gray-200 tw-rounded-md">
                    <router-link @click="disturbSidebarClass" to="/about-us" class="tw-cursor-pointer tw-w-28 tw-text-center tw-p-1 tw-font-semibold tw-text-base hover:tw-bg-[#020933] hover:tw-text-white tw-transition-colors tw-duration-500 tw-rounded-tr-md tw-rounded-tl-md tw-bg-yellow-600">About Us</router-link>
                   </div>
                    <div  class="tw-w-[96%] tw-shadow-xl tw-flex tw-justify-center tw-p-2 tw-bg-gray-200 tw-rounded-md">
                        <router-link @click="disturbSidebarClass" to="/contact-us" class="tw-cursor-pointer tw-w-28 tw-text-center tw-p-1 tw-font-semibold tw-text-base hover:tw-bg-[#020933] hover:tw-text-white tw-transition-colors tw-duration-500 tw-rounded-tr-md tw-rounded-tl-md tw-bg-yellow-600">Contact Us</router-link>
                    </div>
                  <div  class="tw-w-[96%] tw-shadow-xl tw-flex tw-justify-center tw-p-2 tw-bg-gray-200 tw-rounded-md">
                    <router-link @click="disturbSidebarClass" to="/profile" class="tw-cursor-pointer tw-w-28 tw-text-center tw-p-1 tw-font-semibold tw-text-base hover:tw-bg-[#020933] hover:tw-text-white tw-transition-colors tw-duration-500 tw-rounded-tr-md tw-rounded-tl-md tw-bg-yellow-600">View Profile</router-link>
                  </div>
                 <div  class="tw-w-[96%] tw-shadow-xl tw-flex tw-justify-center tw-p-2 tw-bg-gray-200 tw-rounded-md">
                    <span  @click="logout(); disturbSidebarClass()" class="tw-cursor-pointer tw-w-28 tw-text-center tw-p-1 tw-font-semibold tw-text-base hover:tw-bg-[#020933] hover:tw-text-white tw-transition-colors tw-duration-500 tw-rounded-tr-md tw-rounded-tl-md tw-bg-yellow-600">Logout</span>
                 </div>
                </div>
            </div>
            <div :class="['tw-bg-black  tw-opacity-45 tw-transform tw-transition-transform tw-duration-500 tw-h-screen tw-absolute tw-top-0 tw-left-0 tw-w-[30%]', overlayTransform]" @click="disturbSidebarClass"></div>
        </div>
  

</template>