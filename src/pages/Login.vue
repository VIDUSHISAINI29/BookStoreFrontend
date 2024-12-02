<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import { onMounted } from 'vue';
import Navbar from '@/layout/Navbar.vue'
  
 
const { loginWithRedirect } = useAuth0();

function handleLogin(){
        loginWithRedirect({
          appState: {
            target: "/home"
          }
        });
       }
      
  
     
  </script>
  
<template>
  <Navbar />
  <div class="tw-flex tw-h-screen tw-items-center tw-justify-center">
    <div 
      @click="handleLogin"
      class="tw-relative tw-cursor-pointer tw-flex tw-items-center tw-justify-center tw-w-52 tw-h-16 tw-rounded-full tw-bg-[#020933] tw-text-white tw-font-bold tw-text-xl tw-shadow-lg hover:tw-transition-transform tw-transition-transform tw-duration-300 tw-transform hover:tw-scale-105  hover:tw-shadow-2xl md:tw-text-2xl">
      
      <span class="tw-absolute tw-left-4 tw-w-8 tw-h-8 tw-rounded-full tw-bg-white tw-bg-opacity-20"></span>
      <span>Login</span>
      
      <span class="tw-absolute tw-right-4 tw-w-8 tw-h-8 tw-rounded-full tw-bg-white tw-bg-opacity-20"></span>
    </div>
  </div>
  </template>
  
  