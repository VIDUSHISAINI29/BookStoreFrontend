<script setup>
import { ref } from 'vue';

const footerArray = ref(['About Us', 'Careers', 'Press releases', 'Sponsorship', 'Sustainability', 'Environmental']);
const footerHeadArray = ref(['Company', 'Policies', 'Help']);
</script>
<template>
    <div class="tw-w-full tw-bg-yellow-600 tw-flex tw-flex-col tw-gap-10 tw-items-center tw-justify-center">
        <div class="tw-w-4/5  tw-p-1 tw-flex tw-items-center tw-justify-around tw-flex-wrap md:tw-mt-10">
            <div v-for="n in 3" class="tw-flex tw-flex-col ">
                <span class="tw-text-base tw-font-bold tw-text-white hover:tw-text-[#020933] tw-transition-all tw-duration-300 tw-cursor-pointer hover:tw-underline">{{ footerHeadArray[n-1] }}</span>
                <span v-for="(item, index) in footerArray" :key="index" class="tw-text-[12px] tw-text-white hover:tw-text-[#020933] tw-transition-all tw-duration-300 tw-cursor-pointer ">{{item}}</span>
            </div>
           
            <div class="tw-flex tw-gap-3  tw-flex-col tw-font-bold">
                    <span>Follow Us On :</span>
                   <div class="tw-flex tw-gap-3">
                    <i class="ri-facebook-fill tw-border-2  hover:tw-border-[#020933] tw-text-[#020933] hover:tw-text-white hover:tw-bg-sky-600 tw-text-2xl tw-transition-all tw-duration-700 tw-rounded-[50%] tw-w-12 tw-h-12 tw-flex hover:tw-shadow-whiteShadow tw-justify-center tw-items-center  tw-border-[#020933] tw-cursor-pointer"></i>
                
                <i class="ri-instagram-line tw-border-2 tw-text-2xl  hover:tw-border-[#020933] tw-text-[#020933] hover:tw-text-pink-700 hover:tw-bg-white hover:tw-shadow-whiteShadow tw-transition-all tw-duration-700 tw-rounded-[50%] tw-w-12 tw-h-12 tw-flex tw-justify-center tw-items-center  tw-border-[#020933] tw-cursor-pointer"></i>
                <i class="ri-linkedin-fill tw-border-2 tw-text-2xl hover:tw-shadow-whiteShadow hover:tw-border-[#020933] tw-text-[#020933] hover:tw-text-sky-600 hover:tw-bg-white tw-transition-all tw-duration-700 tw-rounded-[50%] tw-w-12 tw-h-12 tw-flex tw-justify-center tw-items-center  tw-border-[#020933] tw-cursor-pointer"></i>
                   </div>
                </div>
           
        </div> 
        <div class="tw-w-full tw-bg-gray-900 tw-p-4 tw-text-center">
            <span class="tw-text-white tw-text-[13px]" >Copyright &copy; 2024 US Airways. All Rights Reserved. Terms of Use</span>
        </div>
        </div>
</template>