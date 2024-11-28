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
      class="tw-flex tw-h-full  tw-w-full tw-flex-col tw-items-center tw-p-3 tw-text-center tw-text-black">
      <div v-if="selectedBook" class="tw-mt-20 tw-mb-10 tw-flex tw-w-3/4">
         <div>
            <img
               class="tw-h-[350px] tw-w-72"
               :src="selectedBook.image"
               alt="" />
         </div>
         <div
            class="tw-relative  tw-mx-20 tw-mb-1 tw-mt-6 tw-flex tw-flex-col tw-items-start">
            <span class="tw-text-2xl tw-mb-2 tw-font-semibold tw-text-[#020933]">
               Book : {{ selectedBook.bookName }}
            </span>
            <span class="tw-text-2xl tw-font-semibold tw-text-yellow-700">
               Author : {{ selectedBook.author }}
            </span>
            <span class="tw-h-[1px] tw-w-full tw-bg-black"></span>
            <span class="tw-mt-3 tw-text-lg tw-font-semibold tw-my-4 tw-text-black">
               Quantity : <input type="number" v-model="quantity" class="tw-bg-[#ffe19f]  tw-rounded-xl tw-outline-none tw-text-sm tw-p-2 tw-text-[#020933]" placeholder=" Enter quantity...">
            </span>
            <span class="tw-text-lg tw-font-semibold tw-text-black">
               Price : {{ totalPrice }}
            </span>
            <span class="tw-h-[1px] tw-w-full tw-bg-black"></span>

            <div class="tw-flex tw-gap-6 tw-items-center">
               <span
                  class="tw-my-3 tw-text-lg tw-font-semibold tw-text-green-800">
                  Rating : {{ selectedBook.rating }}
               </span>
               <div>
                  <i v-for="(n, index) in rate" :key="index" class="tw-text-yellow-600 ri-star-fill"></i>
                  <i v-for="(n, index) in nonRate" :key="index" class=" ri-star-line"></i>
               </div>
            </div>
            <span @click="countBooks(selectedBook.index)"
               class="tw-my-3 tw-flex tw-h-10 tw-w-32 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-3xl tw-bg-yellow-600 tw-text-lg tw-font-semibold tw-text-[#020933] tw-transition-colors tw-duration-700 hover:tw-bg-[#020933] hover:tw-text-white">
               Add to Cart
            </span>
            <span class="tw-h-[1px] tw-w-full tw-bg-black"></span>
            <div class=" tw-w-4/5 tw-flex tw-gap-12 tw-my-14">
                 <div v-for="(icon, index) in iconsClassesArray" :key="index" class="tw-flex tw-flex-col">
                    <span class="tw-border-2 tw-border-[#020933] tw-w-16 tw-h-16 tw-rounded-[50%] tw-flex tw-justify-center tw-items-center tw-cursor-pointer">
                        <i :class="['tw-text-5xl tw-text-yellow-600', icon]"></i>
                    </span>
                    <span class="tw-text-[#020933] tw-block tw-text-[12px] tw-font-bold">{{ adjectivesArray[index] }}</span>
                 </div>
                </div>
         </div>
      </div>
   </div>
</template>
