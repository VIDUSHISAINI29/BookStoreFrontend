<script setup></script>
<template>
   <div>
      <div class=" tw-justify-center tw-items-center tw-w-full tw-p-2 tw-h-[90vh] tw-flex tw-flex-col tw-gap-10">
        <div class="tw-w-1/2  tw-p-1 tw-flex tw-flex-col  tw-gap-5 tw-justify-center tw-items-center">
            <div class=" tw-border-[8px] tw-border-green-600 tw-p-2 tw-rounded-[50%] tw-flex tw-justify-center tw-items-center tw-w-40 tw-h-40 tw-bg-transparent">
                <div class="tw-p-1 tw-rounded-[50%] tw-w-[150px] tw-h-[137px] tw-flex tw-justify-center tw-items-center"><i class="tw-text-[140px]  tw-text-green-600 ri-checkbox-circle-fill"></i></div>
            </div>
            <span class="tw-text-3xl tw-text-cyan-500 tw-font-semibold ">Payment Successful !! 🤩🎉</span>
            <router-link to="/home"
               class="tw-my-3 tw-flex tw-h-10 tw-w-48 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-3xl tw-bg-yellow-600   tw-text-[#020933] tw-transition-colors tw-duration-700 hover:tw-bg-[#020933] hover:tw-text-white">
               Continue Shopping
            </router-link>
        </div>
      </div>
   </div>
</template>
