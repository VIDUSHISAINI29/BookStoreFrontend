<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref, watch, watchEffect } from "vue";
import axios from "axios";
import { color } from "echarts";
import HomeCards from "./HomeCards.vue";
import ContactUs from "../../components/ContactUs.vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { useGlobalStore } from "@/stores/global";
const global = useGlobalStore();
const userInfo = ref(null);
const tempIsAuthenticated = ref(null);

// const { user, isAuthenticated, isLoading } =  useAuth0();
// userInfo.value =  user;
// global.profileEmail = user.value.email;

const route = useRoute();
const booksData = ref(null);
const fetchData = async (url) => {
   try {
      const result = await axios.get(url);
      return result.data;
   } catch (error) {
      console.log("error in fetching at frontend", error);
   }
};
async function loadData() {
   booksData.value = await fetchData(
      `${import.meta.env.VITE_BACKEND_URL}/books-details`,
   );
}
onMounted(async () => {
   await loadData();
});
</script>

<template>
   <div v-if="!route.params.uri">
      <div class="tw-flex tw-flex-col tw-items-center tw-bg-white">
         <div
            class="md:flex-row lg:tw-mt-10 tw-flex tw-items-center xxs-300:tw-mb-5 md:tw-mb-0 md:tw-justify-around xxs-300:tw-justify-center md:tw-gap-2 tw-flex-wrap">
            <div class="tw-p-1">
               <img
                  class="2xl:tw-mx-20 tw-my-8 xxs-300:tw-mt-3 lg:tw-h-[400px] md:tw-w-[390px] md:tw-h-[290px] sm:tw-h-[400px] sm:tw-w-[640px] xs-500:tw-h-[330px] xxs-300:tw-h-[260px] xs-400:tw-h-[300px]  lg:tw-w-[500px] xxs-300:tw-w-[400px] xl:tw-h-[450px] xl:tw-w-[580px] xs-500:tw-w-[515px] tw-rounded-3xl"
                  src="/images/booksGirl2.jpg"
                  alt="" />
            </div>
            <div class="tw-flex lg:tw-w-[500px]  xl:tw-w-[590px] xxs-300:tw-w-[315px] sm:tw-w-[640px] md:tw-w-[360px] xs-400:tw-w-[400px] xs-500:tw-w-[500px]  tw-flex-col xxs-300:tw-gap-2 lg:tw-gap-10 lg:tw-p-3 xxs-300:tw-px-3">
               <span class="xl:tw-text-[50px] lg:tw-text-[43px] xxs-300:tw-text-2xl md:tw-text-3xl xs-500:tw-text-4xl  tw-font-semibold tw-text-[#020933]">
                  Let the Pages Turn You !
               </span>
               <span class="tw-text-2xl lg:tw-text-xl xl:tw-text-2xl xxs-300:tw-text-sm xs-500:tw-text-lg md:tw-text-base tw-text-yellow-600">
                  Unfold new worlds, one page at a time. Our Book Fair is a
                  sanctuary for curious minds, where stories spark imagination,
                  and knowledge flows freely. Find your next great escape or
                  timeless wisdom, all in one place.
               </span>
            </div>
         </div>
         <HomeCards />
      </div>
   </div>
   <router-view v-else />
</template>

<style scoped></style>
