<script setup>
import { useRoute } from "vue-router";
import {onMounted, ref} from 'vue';
import axios from "axios";
import {color} from "echarts";
import Cards from '@/components/Cards.vue'

const route = useRoute();
const booksData = ref(null);
const fetchData = async(url) => {
   try {
      const result = await axios.get(url);
      return result.data;
   } catch (error) {
      console.log('error in fetching at frontend', error);
   }
}
async function loadData(){
   booksData.value = await fetchData(`${import.meta.env.VITE_BACKEND_URL}/books-details`);
}
onMounted(async () => {
   await loadData();
})
</script>

<template>
   <div v-if="!route.params.uri">
     <div class="tw-bg-gray-100 tw-p-1 tw-flex tw-items-center tw-flex-col">
      <div class="tw-flex tw-justify-around tw-gap-10 tw-items-center">
         <div class=" tw-p-1">  <img class="tw-my-8 tw-rounded-3xl tw-mx-20 tw-w-[500px] tw-h-[400px]" src="/images/booksGirl.jpg" alt="">   </div>
      <div class=" tw-p-3 tw-w-[550px]  tw-flex tw-flex-col tw-gap-10"> 
          <span class="tw-text-[#020933] tw-text-5xl tw-font-semibold">Let the Pages Turn You !</span>   
         <span class="tw-text-yellow-600 tw-text-2xl ">Unfold new worlds, one page at a time. Our Book Fair is a sanctuary for curious minds, where stories spark imagination, and knowledge flows freely. Find your next great escape or timeless wisdom, all in one place.</span></div>
      </div>
      <Cards />
     </div>
     
   </div>
   <router-view v-else />
</template>

<style scoped></style>
