
<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import { onMounted, ref, watch, watchEffect } from "vue";
import { useGlobalStore } from "@/stores/global";
const global = useGlobalStore();

const auth0 = useAuth0();

      function logout() {
        auth0.logout({ 
          logoutParams: { 
            returnTo: window.location.origin 
          } 
        });
      }
 
  
const userInfo = ref(null)
const tempIsAuthenticated = ref(null);

const { user, isAuthenticated, isLoading } =  useAuth0();
userInfo.value =  user;
global.profileName = user.value.name;
global.profileEmail = user.value.email;
global.profileImg = user.value.picture;
console.log("name:", user.value);

</script>
<template>
<div class="tw-h-[90vh]">
    <div>
        <div v-if="isLoading">
      <p>Loading...</p>
    </div>

    <!-- Show user information if authenticated -->
    <div class="tw-w-full tw-my-12  lg:tw-text-base xxs-300:tw-text-[10px]  tw-flex tw-flex-col tw-gap-4 tw-items-center" v-else-if="isAuthenticated">
        <img :src="userInfo.value.picture" class="tw-w-40 tw-rounded-[50%] tw-shadow-2xl tw-h-40" :alt="userInfo.value.name" />
      <h2 class="lg:tw-text-3xl xxs-300:tw-text-xl tw-font-semibold tw-text-[#020933]">Welcome, {{ userInfo.value.name }}!</h2>
      <div class="tw-flex tw-w-full tw-gap-4 tw-justify-center tw-items-center">
        <span  class="tw-bg-gray-200 tw-p-1 xxs-300:tw-w-20 lg:tw-w-28 tw-text-center tw-rounded-lg ">Email</span> <span class="lg:tw-w-3 xxs-300:tw-w-1 tw-text-end">:</span> <span class="tw-bg-gray-200 tw-p-1 xxs-300:tw-w-48 lg:tw-w-56 tw-text-center tw-rounded-lg ">{{ userInfo.value.email }}</span>
      </div>
      <div class="tw-flex tw-w-full tw-gap-4 tw-justify-center tw-items-center">
        <span  class="tw-bg-gray-200 tw-p-1 xxs-300:tw-w-20 lg:tw-w-28 tw-text-center tw-rounded-lg ">Name</span> <span class="lg:tw-w-3 xxs-300:tw-w-1 tw-text-end">:</span> <span class="tw-bg-gray-200 tw-p-1 lg:tw-w-56 tw-text-center xxs-300:tw-w-48 tw-rounded-lg ">{{ userInfo.value.name }}</span>
      </div>
      <div class="tw-flex tw-w-full tw-gap-4 tw-justify-center tw-items-center">
        <span  class="tw-bg-gray-200 tw-p-1 xxs-300:tw-w-20 lg:tw-w-28 tw-text-center tw-rounded-lg ">Nickname</span> <span class="lg:tw-w-3 xxs-300:tw-w-1 tw-text-end">:</span> <span class="tw-bg-gray-200 tw-p-1 lg:tw-w-56 xxs-300:tw-w-48 tw-text-center tw-rounded-lg ">{{ userInfo.value.nickname }}</span>
      </div>
      <div class="tw-flex tw-w-full tw-gap-4 tw-justify-center tw-items-center">
        <span  class="tw-bg-gray-200 tw-p-1 xxs-300:tw-w-20 lg:tw-w-28 tw-text-center tw-rounded-lg ">Updated on</span> <span class="lg:tw-w-3 xxs-300:tw-w-1 tw-text-end">:</span> <span class="tw-bg-gray-200 tw-p-1 lg:tw-w-56 xxs-300:tw-w-48 tw-text-center tw-rounded-lg ">{{ userInfo.value.updated_at.slice(0,10) }}</span>
      </div>
     
      

      <span @click="logout"
               class="addCart tw-my-3 tw-flex tw-h-10 tw-w-24 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-3xl tw-text-white hover:tw-bg-yellow-600 tw-text-lg tw-font-semibold hover:tw-text-[#020933] tw-transition-colors tw-duration-700 tw-bg-[#020933] w-text-white">
               Logout
            </span>
      
    </div>

    <!-- Show not-logged-in message -->
    <div v-else>
      <p>You are not logged in.</p>
    </div>
      </div>
</div>
</template>