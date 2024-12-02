<script setup>
import { ref } from 'vue';

const footerArray = ref(['About Us', 'Careers', 'Press releases', 'Sponsorship', 'Sustainability', 'Environmental']);
const footerHeadArray = ref(['Company', 'Policies', 'Help']);
</script>
<template>
    <div class="tw-w-full tw-bg-yellow-600 tw-flex tw-flex-col tw-gap-10 tw-items-center tw-justify-center">
        <div class="tw-w-4/5  tw-p-1 tw-flex tw-items-center tw-justify-around md:tw-gap-0 tw-gap-4 tw-flex-wrap md:tw-mt-10">
            <div v-for="n in 3" class="md:tw-flex md:tw-flex-col xxs-300:tw-hidden">
                <span class="tw-text-base lg:tw-text-lg tw-font-bold tw-text-white hover:tw-text-[#020933] tw-transition-all tw-duration-300 tw-cursor-pointer hover:tw-underline">{{ footerHeadArray[n-1] }}</span>
                <span v-for="(item, index) in footerArray" :key="index" class="tw-text-[12px] lg:tw-text-sm tw-text-white hover:tw-text-[#020933] tw-transition-all tw-duration-300 tw-cursor-pointer ">{{item}}</span>
            </div>
            <div v-for="n in 1" class="tw-flex tw-flex-col tw-mt-4  md:tw-hidden">
                <span class="tw-text-sm tw-font-bold tw-text-white hover:tw-text-[#020933] tw-transition-all tw-duration-300 tw-cursor-pointer hover:tw-underline">{{ footerHeadArray[n-1] }}</span>
                <span v-for="(item, index) in footerArray" :key="index" class="tw-text-[11px] tw-text-white hover:tw-text-[#020933] tw-transition-all tw-duration-300 tw-cursor-pointer ">{{item}}</span>
            </div>
           
            <div class="tw-flex tw-gap-3  tw-flex-col tw-font-bold">
                    <span class="tw-text-sm lg:tw-text-base">Follow us on :</span>
                   <div class="tw-flex tw-gap-3">
                    <i class="ri-facebook-fill tw-border-2  hover:tw-border-[#020933] tw-text-[#020933] hover:tw-text-white hover:tw-bg-sky-600 md:tw-text-2xl tw-text-lg tw-transition-all tw-duration-700 tw-rounded-[50%] md:tw-w-12 tw-w-8 tw-h-8 md:tw-h-12 tw-flex hover:tw-shadow-whiteShadow tw-justify-center tw-items-center  tw-border-[#020933] tw-cursor-pointer"></i>
                
                <i class="ri-instagram-line tw-border-2 md:tw-text-2xl tw-text-lg  hover:tw-border-[#020933] tw-text-[#020933] hover:tw-text-pink-700 hover:tw-bg-white hover:tw-shadow-whiteShadow tw-transition-all tw-duration-700 tw-rounded-[50%] md:tw-w-12 tw-w-8 tw-h-8 md:tw-h-12 tw-flex tw-justify-center tw-items-center  tw-border-[#020933] tw-cursor-pointer"></i>
                <i class="ri-linkedin-fill tw-border-2 md:tw-text-2xl tw-text-lg hover:tw-shadow-whiteShadow hover:tw-border-[#020933] tw-text-[#020933] hover:tw-text-sky-600 hover:tw-bg-white tw-transition-all tw-duration-700 tw-rounded-[50%] md:tw-w-12 tw-w-8 tw-h-8 md:tw-h-12 tw-flex tw-justify-center tw-items-center  tw-border-[#020933] tw-cursor-pointer"></i>
                   </div>
                </div>
           
        </div> 
        <div class="tw-w-full tw-bg-gray-900 tw-py-3 md:tw-p-4 tw-text-center">
            <span class="tw-text-white tw-text-[10px] lg:tw-text-sm" >Copyright &copy; 2024 BookFair. All Rights Reserved. Terms of Use</span>
        </div>
        </div>
</template>