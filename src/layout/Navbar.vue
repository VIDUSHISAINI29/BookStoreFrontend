<script setup>


import{ useGlobalStore} from "@/stores/global.js"
const global = useGlobalStore();
</script>
<template>
    <div class="tw-w-full tw-flex tw-justify-between col tw-bg-yellow-600 tw-p-1 tw-px-6 tw-items-center">
        <div class="">
            <img class="tw-w-14 tw-cursor-pointer tw-h-14 tw-rounded-[50%]" src="/images/booksLogo.jpeg" alt="logo">
        </div>
        <div class="tw-flex tw-gap-9">
            <div class="tw-flex tw-flex-col">
                <router-link to="/home" class="tw-text-[#020933]  hover:tw-bg-[#020933] tw-rounded-tl-lg  tw-rounded-tr-lg hover:tw-text-white tw-py-[1px] tw-px-[6px]  tw-cursor-pointer  tw-font-semibold tw-transition-colors tw-duration-200 tw-ease-in tw-text-[16px] ">Home</router-link>
                <span class="tw-bg-[#020933] tw-h-[2px]"></span>
            </div>
            <div class="tw-flex tw-flex-col">
                <span class="tw-text-[#020933] hover:tw-bg-[#020933] tw-rounded-tl-lg  tw-rounded-tr-lg hover:tw-text-white tw-py-[1px] tw-px-[6px]    tw-cursor-pointer  tw-font-semibold tw-transition-colors tw-duration-200 tw-ease-in tw-text-[16px] ">Services</span>
                <span class="tw-bg-[#020933] tw-h-[2px]"></span>
            </div>
            <div class="tw-flex tw-flex-col">
                <span class="tw-text-[#020933] hover:tw-bg-[#020933] tw-rounded-tl-lg  tw-rounded-tr-lg hover:tw-text-white tw-py-[1px] tw-px-[6px]  tw-cursor-pointer  tw-font-semibold tw-transition-colors tw-duration-200 tw-ease-in tw-text-[16px] ">About Us</span>
                <span class="tw-bg-[#020933] tw-h-[2px]"></span>
            </div>
            <div class="tw-flex tw-flex-col">
                <span class="tw-text-[#020933] hover:tw-bg-[#020933] tw-rounded-tl-lg  tw-rounded-tr-lg hover:tw-text-white tw-py-[1px] tw-px-[6px]    tw-cursor-pointer  tw-font-semibold tw-transition-colors tw-duration-200 tw-ease-in tw-text-[16px] ">Contact Us</span>
                <span class="tw-bg-[#020933] tw-h-[2px]"></span>
            </div>
        </div>
        <div class="tw-flex tw-gap-8">
           <div class="tw-relative">
            <RouterLink to="/cart" class="ri-shopping-cart-2-fill tw-cursor-pointer tw-text-[#020933] tw-text-4xl"></RouterLink>
            <span class="tw-block tw-absolute tw-top-0 tw-right-0 tw-w-4 tw-h-4 tw-rounded-[50%] tw-font-bold tw-bg-yellow-200 tw-text-[11px] tw-text-[#020933] tw-text-center">{{ global.numberOfBooks }}</span>
           </div>
            <span class="tw-text-white tw-border-2 tw-transition-all tw-duration-200 tw-cursor-pointer tw-border-2-[#020933] hover:tw-bg-[#FFC0CB] tw-font-semibold hover:bShadow tw-p-[3px] tw-px-3 tw-rounded-3xl tw-bg-[#020933] hover:tw-text-[#020933] hover:tw-border-2-[#020933]">Logout</span>
        </div>
    </div>
</template>