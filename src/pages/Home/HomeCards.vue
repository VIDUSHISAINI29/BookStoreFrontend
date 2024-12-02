<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import { color } from "echarts";

const route = useRoute();
const booksData = ref(null);
const bookImages = ref(null);
const bookName = ref(null);
const bookAuthor = ref(null);
const bookRating = ref(null);
const bookIndex = ref(null);
const authorParam = ref(null);
const selectedBooksArray = ref([]);
const bookNameLength = ref(null);



import{ useGlobalStore} from "@/stores/global.js"
const global = useGlobalStore();

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
   // console.log("booksDataValue = ", booksData.value);
   bookName.value = booksData.value.map((book) => {
      
       bookName.value = book.bookName.split("(")[0];
      bookNameLength.value = book.bookName.split(' ').length
      
   if(bookNameLength.value > 4)
   {
      bookName.value = bookName.value.slice(0,27) + '...';
   }
   return bookName.value
   });
   bookImages.value = booksData.value.map((book) => book.image);
  
}
watch(authorParam, async (newValue, oldValue) => {
   
    await booksData.value.map((book) => {
     
      if(authorParam.value === book.author){
         selectedBooksArray.value.push(book)
         booksData.value = selectedBooksArray.value;
         console.log(booksData.value);
      }
   })
   bookImages.value = booksData.value.map((book) => book.image);
   bookName.value = booksData.value.map((book) => {
       bookName.value = book.bookName.split("(")[0];
      bookNameLength.value = book.bookName.split(' ').length
      
   if(bookNameLength.value > 4)
   {
      bookName.value = book.bookName.slice(0, 27)+ '...';
   }
   return bookName.value
   });

  
   // console.log('book Name ', bookName.value);
   
})

onMounted(async () => {
   await loadData();
   
});
</script>
<template>
   <div
      class="tw-flex xxs-300:tw-my-3 tw-my-20 tw-mb-32 xxs-300:tw-w-[314px] xs-400:tw-w-[395px] xs-500:tw-w-[495px] sm:tw-w-[640px] md:tw-w-[750px] lg:tw-w-[1020px] xl:tw-w-[1100px] tw-flex-col  tw-gap-14 tw-rounded-lg tw-py-6 tw-bg-[#ffe19f] lg:tw-p-14">
      <div class="tw-flex tw-w-[550px] xxs-300:tw-w-full  tw-justify-center tw-p-1 xxs-300:tw-text-[13px] lg:tw-text-base">
         <input
            placeholder="Search by Author"
            class="sm:tw-w-[450px]  xxs-300:tw-w-[220px] xs-400:tw-w-[250px] tw-rounded-bl-xl tw-rounded-tl-xl tw-border-2 tw-text-[#020933] tw-border-yellow-600 tw-p-2  tw-outline-none"
            type="text"
            v-model="authorParam" />
         <button
            class="sm:tw-w-[100px] xxs-300:tw-w-[80px] xs-400:tw-w-[87px] tw-rounded-br-xl tw-rounded-tr-xl tw-bg-yellow-600 tw-p-2 tw-text-[#020933]">
            Search
         </button>
      </div>

     <div class="tw-flex  tw-flex-wrap tw-flex-row tw-items-center tw-justify-center  xxs-300:tw-gap-6  xl:tw-gap-14 lg:tw-gap-4 sm:tw-gap-4 tw-w-full">
      <div
         v-for="(book, index) in booksData"
         :key="index"
         class="tw-relative tw-flex tw-h-[450px]  xxs-300:tw-w-60  xs-400:tw-w-72 tw-flex-col tw-items-center tw-gap-1 tw-rounded-xl tw-bg-[#fff] tw-font-semibold">
         <div class="tw-overflow-hidden">
            <img
               class="tw-h-80 tw-w-72 tw-rounded-tl-xl tw-rounded-tr-xl tw-transition-transform tw-duration-500 hover:tw-scale-95"
               :src="book.image"
               alt="" />
         </div>
         <span
            class="tw-block tw-px-1 tw-text-lg tw-font-bold tw-text-yellow-800">
            {{ bookName[index] }}
         </span>
         <span class="tw-block tw-px-1 tw-text-base tw-text-yellow-700">
            ~By {{ book.author }}
         </span>
         <!-- <span class="tw-block tw-px-3 tw-text-base tw-text-black">
            Price : {{ book.price }}
         </span> -->
         <span
            class=" tw-px-1 tw-text-start tw-text-base tw-text-[#020933]">
            Rating : {{ book.rating }}
         </span>
         <div
            class="tw-absolute tw-bottom-4 tw-right-4 tw-flex tw-w-full tw-justify-end ">
            <router-link :to="`/home/${book.index}`"
               class="tw-w-16 tw-cursor-pointer tw-border-2 tw-border-yellow-600 hover:tw-border-[#020933] hover:tw-bg-[#020933] hover:tw-text-white tw-transition-colors tw-duration-500 tw-rounded-2xl tw-bg-yellow-600 tw-text-center tw-py-1 tw-text-sm tw-text-[#020933] ">
               View
            </router-link>
         </div>
      </div>
     </div>
   </div>
</template>
