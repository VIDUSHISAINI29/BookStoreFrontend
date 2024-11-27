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
      console.log("Fetched booksData:", booksData.value);
   }
}

function updateSelectedBook() {
   if (!booksData.value) return;

   const book = booksData.value.find((b) => b.index == props.uri);
   if (book) {
      selectedBook.value = book;
      rate.value = parseInt(selectedBook.value.rating.slice(0, 1));
      nonRate.value = 5 - rate.value;
        selectedBook.value.price = '$'+selectedBook.value.price.slice(1,4) * quantity.value;
   } else {
      console.error("No book found for uri:", props.uri);
      selectedBook.value = null;
   }
}
onMounted(async () => {
   await console.log("propsUri ", props.uri);
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
</script>
<template>
    <div class="tw-w-full tw-bg-red-300 tw-p-2 tw-flex tw-justify-center tw-items-center">
        <div class="tw-w-[880px] tw-bg-purple-300 tw-p-2">
            <div class="tw-bg-green-300 tw-p-1 tw-flex tw-gap-1">
                <span class="tw-w-20 tw-bg-gray-400 tw-justify-center tw-items-center tw-flex tw-p-1 tw-text-[#020933] tw-text-lg tw-font-bold">Image</span>
                <span class="tw-w-80 tw-bg-gray-400 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold">Book</span>
                <span class="tw-w-20 tw-bg-gray-400 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold">Quantity</span>
                <span class="tw-w-20 tw-bg-gray-400 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold">More</span>
                <span class="tw-w-20 tw-bg-gray-400 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold">Less</span>
                <span class="tw-w-28 tw-bg-gray-400 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold">Total Price</span>
                <span class="tw-w-20 tw-bg-gray-400 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold">Cancel</span>
            </div>
            <div class="tw-bg-green-300 tw-p-1 tw-flex tw-gap-1">
                <span class="tw-w-20 tw-bg-gray-400 tw-justify-center tw-items-center tw-flex tw-p-1 tw-text-[#020933] tw-text-lg tw-font-bold">Image</span>
                <span class="tw-w-80 tw-bg-gray-400 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold">Book</span>
                <span class="tw-w-20 tw-bg-gray-400 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold">Quantity</span>
                <span class="tw-w-20 tw-bg-gray-400 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold">More</span>
                <span class="tw-w-20 tw-bg-gray-400 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold">Less</span>
                <span class="tw-w-28 tw-bg-gray-400 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold">Total Price</span>
                <span class="tw-w-20 tw-bg-gray-400 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold">Cancel</span>
            </div>
        </div>
    </div>
</template>