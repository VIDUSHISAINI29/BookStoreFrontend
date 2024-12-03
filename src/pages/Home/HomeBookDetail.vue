<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const props = defineProps({
   uri: String,
});
import{ useGlobalStore} from "@/stores/global.js"
const global = useGlobalStore();


const booksData = ref(null);
const quantity = ref(1);
const totalPrice = ref(null);
const selectedBook = ref(null);
const rate = ref(null);
const nonRate = ref(null);
const adjectivesArray = ref(['Easy Return', 'Certified Product', 'On Time Delivery', 'Secure Checkout', 'Premium Quality']);
const iconsClassesArray = ref(['ri-refund-2-line', 'ri-sparkling-fill', 'ri-caravan-fill', 'ri-shield-flash-line', 'ri-thumb-up-fill']);
const fetchData = async (url) => {
   try {
      const result = await axios.get(url);
      return result.data;
   } catch (error) {
      console.log("error in fetching at frontend", error);
   }
};
async function loadData() {
   if (!booksData.value) {
      booksData.value = await fetchData(
         `${import.meta.env.VITE_BACKEND_URL}/books-details`,
      );
      // console.log("Fetched booksData:", booksData.value);
   }
}

function updateSelectedBook() {
   if (!booksData.value) return;

   const book = booksData.value.find((b) => b.index == props.uri);
   if (book) {
      selectedBook.value = book;
      rate.value = parseInt(selectedBook.value.rating.slice(0, 1));
      nonRate.value = 5 - rate.value;
      totalPrice.value = '₹'+selectedBook.value.price.slice(1,4) * quantity.value;
   } else {
      console.error("No book found for uri:", props.uri);
      selectedBook.value = null;
   }
}
onMounted(async () => {
   // await console.log("propsUri ", props.uri);
   await loadData();
   updateSelectedBook();
});
watch(
   () => props.uri,
   async (newValue, oldValue) => {
      await updateSelectedBook();
      
   },
);
watch( quantity, async(newValue, oldValue) => {
    if(quantity.value < 1)
{
    quantity.value = 1;
}
updateSelectedBook()
// console.log('quanitt', quantity.value);

})
function countBooks(id){
   
   global.arrayOfBooks.push(id);
   // console.log('id = ', global.arrayOfBooks);
  
   const count = global.arrayOfBooks.filter(bookId => bookId === id).length;

   const cartedBook = booksData.value.find((b) => b.index == id)
   if(count === 1){
      global.numberOfBooks++

      if(cartedBook){
      global.globalSelectedBook.push(cartedBook);
   global.globalQuantity.push(quantity.value)
   }
   }

}
</script>
<template>
   <div
      class="tw-flex tw-h-full tw-mt-7 tw-w-full tw-flex-col tw-items-center xxs-300:tw-p-1 lg:tw-p-3 tw-text-center tw-text-black">
      <div v-if="selectedBook" class="lg:tw-mt-20 tw-mb-10 tw-flex md:tw-gap-9 tw-gap-2  tw-justify-center tw-flex-wrap xxs-300:tw-w-full lg:tw-w-11/12">
         <div class="tw-flex tw-flex-col  tw-gap-3">
            <img
               class="lg:tw-h-[350px] lg:tw-w-72 xxs-300:tw-w-20 sm:tw-h-52 sm:tw-w-44 md:tw-w-60 md:tw-h-72  xs-500:tw-h-44 xs-500:tw-w-36 xs-400:tw-h-36 xs-400:tw-w-28 xxs-300:tw-h-28"
               :src="selectedBook.image"
               alt="" />
              
         </div>
         <div
            class="tw-relative xs-500:tw-w-[320px] sm:tw-w-[440px]  xs-400:tw-w-[260px] xxs-300:tw-w-[200px] md:tw-w-1/2 tw-mb-1 lg:tw-mt-6 tw-flex tw-flex-col tw-items-start ">
            <span class="lg:tw-text-2xl xxs-300:tw-text-[12px] tw-text-start sm:tw-text-lg tw-text-wrap lg:tw-mb-2 tw-font-semibold tw-text-[#020933]">
               Book : {{ selectedBook.bookName }}
            </span>
            <span class="lg:tw-text-2xl xxs-300:tw-text-[12px] sm:tw-text-base   tw-font-semibold tw-text-yellow-700">
               Author : {{ selectedBook.author }}
            </span>
            <span class="tw-h-[1px] tw-w-full tw-bg-black"></span>
            <span class="lg:tw-mt-3 sm:tw-mt-4 xxs-300:tw-text-[10px] sm:tw-text-sm xxs-300:tw-my-2 lg:tw-text-lg tw-font-semibold xxs-300:tw-mt-1 tw-text-black">
               Quantity : <input type="number" v-model="quantity" class="tw-bg-[#ffe19f] xxs-300:tw-rounded-md lg:tw-rounded-xl tw-outline-none sm:tw-text-sm xxs-300:tw-text-[8px] xxs-300:tw-w-14 xxs-300:tw-px-2  lg:tw-p-2 tw-text-[#020933]" placeholder=" Enter quantity...">
            </span>
            <span class="lg:tw-text-lg sm:tw-mb-3 xxs-300:tw-text-[13px] sm:tw-text-base tw-font-semibold tw-text-black">
               Price : {{ totalPrice }}
            </span>
            <span class="tw-h-[1px] tw-w-full tw-bg-black"></span>

            <div class="tw-flex lg:tw-gap-6 xxs-300:tw-gap-3 tw-items-center">
               <span
                  class="tw-my-3 lg:tw-text-lg sm:tw-text-sm  xxs-300:tw-text-[12px] tw-font-semibold tw-text-green-800">
                  Rating : {{ selectedBook.rating }}
               </span>
               <div class=" tw-flex tw-items-center">
                  <i v-for="(n, index) in rate" :key="index" class="tw-text-yellow-600 xxs-300:tw-text-[12px] ri-star-fill"></i>
                  <i v-for="(n, index) in nonRate" :key="index" class=" ri-star-line tw-text-[12px]"></i>
               </div>
            </div>
            <span @click="countBooks(selectedBook.index)"
               class="addCart  lg:tw-my-3 sm:tw-text-sm sm:tw-w-28 sm:tw-py-2 xxs-300:tw-mb-2 md:tw-flex xxs-300:tw-py-1 lg:tw-h-10 lg:tw-w-32 xxs-300:tw-w-20 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-3xl tw-bg-yellow-600 xxs-300:tw-text-[12px] lg:tw-text-lg tw-font-semibold tw-text-[#020933] tw-transition-colors md:tw-text-base tw-duration-700 hover:tw-bg-[#020933] hover:tw-text-white">
               Add to Cart
            </span>
            <span class="tw-h-[1px] tw-w-full tw-bg-black"></span>
            <div class=" lg:tw-w-full xxs-300:tw-w-full md:tw-my-8 tw-flex tw-flex-wrap xs-500:tw-gap-4 md:tw-gap-8 xxs-300:tw-my-2 lg:tw-my-14">
                 <div v-for="(icon, index) in iconsClassesArray" :key="index" class="tw-flex tw-flex-col tw-items-center">
                    <span class="tw-border-2 tw-border-[#020933] lg:tw-w-14 lg:tw-h-14 md:tw-w-12 md:tw-h-12 xs-500:tw-w-9 xs-500:tw-h-9 xxs-300:tw-w-6 xxs-300:tw-h-6 tw-rounded-[50%] tw-flex tw-justify-center tw-items-center tw-cursor-pointer">
                        <i :class="['xxs-300:tw-text-base xs-500:tw-text-xl md:tw-text-3xl lg:tw-text-4xl tw-text-yellow-600', icon]"></i>
                    </span>
                    <span class="tw-text-[#020933] tw-block lg:tw-text-[12px] xs-500:tw-text-[10px] xs-300:tw-text-[8px] tw-w-10 tw-text-center xxs-300:tw-text-wrap md:tw-gap-10 xxs-300:tw-font-semibold md:tw-font-bold">{{ adjectivesArray[index] }}</span>
                 </div>
                </div>
         </div>
      </div>
   </div>
</template>
