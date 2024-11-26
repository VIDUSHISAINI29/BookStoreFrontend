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
const selectedBooksArray = ref([])


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
   bookName.value = booksData.value.map((book) => book.bookName.split("(")[0]);
   bookImages.value = booksData.value.map((book) => book.image);
   // console.log("book Img array", bookName.value);
}
watch(authorParam, async (newValue, oldValue) => {
   
    await booksData.value.map((book) => {
     
      if(authorParam.value === book.author){
         selectedBooksArray.value.push(book)
         booksData.value = selectedBooksArray.value;
         console.log(booksData.value);
      }
   })
   console.log(booksData.value);

   console.log('author is changed from ', oldValue, 'to', newValue);
   bookImages.value = booksData.value.map((book) => book.image);

   bookName.value = booksData.value.map((book) => book.bookName.split("(")[0]);
   console.log('book Name ', bookName.value);
   
})
function countBooks(id){
   const arrayOfBooks = [];
   
   arrayOfBooks.push(id);
   console.log('id = ', arrayOfBooks);

   if(!arrayOfBooks.includes(id) ){
      global.numberOfBooks++
   }
console.log('global Value inside function', global.numberOfBooks);

}
onMounted(async () => {
   await loadData();
});
</script>
<template>
   <div
      class="tw-flex tw-w-[1100px] tw-flex-col tw-items-center tw-gap-14 tw-rounded-lg tw-bg-[#ffe19f] tw-p-14">
      <div class="tw-flex tw-w-[550px]  tw-p-1">
         <input
            placeholder="Search by Author"
            class="tw-w-[450px] tw-rounded-bl-xl tw-rounded-tl-xl tw-border-2 tw-border-yellow-600 tw-p-2 tw-text-[#020933] tw-outline-none"
            type="text"
            v-model="authorParam" />
         <button
            class="tw-w-[100px] tw-rounded-br-xl tw-rounded-tr-xl tw-bg-yellow-600 tw-p-2 tw-text-[#020933]">
            Search
         </button>
      </div>

     <div class="tw-flex  tw-flex-wrap tw-gap-14 tw-w-full">
      <div
         v-for="(book, index) in booksData"
         :key="index"
         class="tw-relative tw-flex tw-h-[500px] tw-w-72 tw-flex-col tw-gap-1 tw-rounded-xl tw-bg-[#fff] tw-font-semibold">
         <div class="tw-overflow-hidden">
            <img
               class="tw-h-80 tw-w-72 tw-rounded-tl-xl tw-rounded-tr-xl tw-transition-transform tw-duration-500 hover:tw-scale-95"
               :src="book.image"
               alt="" />
         </div>
         <span
            class="tw-block tw-px-3 tw-text-lg tw-font-bold tw-text-yellow-800">
            {{ bookName[index] }}
         </span>
         <span class="tw-block tw-px-3 tw-text-base tw-text-yellow-700">
            ~By {{ book.author }}
         </span>
         <span
            class="tw-block tw-w-full tw-px-3 tw-text-start tw-text-base tw-text-[#020933]">
            Rating : {{ book.rating }}
         </span>
         <div
            class="tw-absolute tw-bottom-5 tw-right-0 tw-flex tw-w-full tw-justify-end tw-pr-8">
            <span @click="countBooks(book.index)"
               class="tw-w-28 tw-cursor-pointer tw-rounded-2xl tw-bg-yellow-600 tw-px-3 tw-py-1 tw-text-base tw-text-[#020933]">
               Add to cart
            </span>
         </div>
      </div>
     </div>
   </div>
</template>
