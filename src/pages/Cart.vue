<script setup>
import { useGlobalStore } from "@/stores/global.js";
import { onMounted, ref, watch } from "vue";
import { loadStripe } from "@stripe/stripe-js";
const global = useGlobalStore();
const booksImagesArray = ref([]);
const booksNamesArray = ref([]);
const booksQuantityArray = ref([]);
const booksTotalPriceArray = ref([]);
const arrayForLoop = ref([]);
const GrandTotalPrice = ref(0);
const unitPricesArray = ref([]);
const removingBookIndex = ref(null);


async function makeArraysReady() {
   booksImagesArray.value = []; // Reset the array
   booksNamesArray.value = [];
   booksQuantityArray.value = [];
   booksTotalPriceArray.value = [];
   unitPricesArray.value = [];
   GrandTotalPrice.value = 0;

   for (let i = 0; i < global.globalSelectedBook.length; i++) {
      await booksImagesArray.value.push(global.globalSelectedBook[i].image);
      await booksNamesArray.value.push(
         global.globalSelectedBook[i].bookName.split("(")[0],
      );
      booksQuantityArray.value = await global.globalQuantity;

      const totalPrice =
         (await global.globalQuantity[i]) *
         parseInt(global.globalSelectedBook[i].price.slice(1, 4));
      unitPricesArray.value.push(totalPrice / booksQuantityArray.value[i]);

      booksTotalPriceArray.value.push(totalPrice);
      GrandTotalPrice.value += totalPrice;
   }
   global.numberOfBooks = global.globalSelectedBook.length;
}

function addQuantity(index) {
   removingBookIndex.value = index;
   global.globalQuantity[index] += 1;
   const totalPrice =
      global.globalQuantity[index] *
      parseInt(global.globalSelectedBook[index].price.slice(1, 4));
   booksTotalPriceArray.value[index] = totalPrice;
   GrandTotalPrice.value += unitPricesArray.value[index];
}
function MinusQuantity(index) {
   removingBookIndex.value = index;
   if (global.globalQuantity[index] > 0) {
      global.globalQuantity[index] -= 1;
   }
   if (global.globalQuantity[index] === 0) {
      removeBookFromCart(index);
   }
   const totalPrice =
      global.globalQuantity[index] *
      parseInt(global.globalSelectedBook[index].price.slice(1, 4));
   booksTotalPriceArray.value[index] = totalPrice;
   const boolean =
      booksTotalPriceArray.value[index] > unitPricesArray.value[index];
   if (global.globalQuantity[index] >= 1) {
      GrandTotalPrice.value -= unitPricesArray.value[index];
   }
}
async function removeBookFromCart(index) {
   removingBookIndex.value = index;
   global.globalSelectedBook.splice(index, 1);
   global.globalQuantity.splice(index, 1);
   booksTotalPriceArray.value.splice(index, 1);
   global.numberOfBooks = global.globalSelectedBook.length;
}
onMounted(async () => {
   await makeArraysReady(removingBookIndex.value);
});
watch(global.globalSelectedBook, async (newValue, oldValue) => {
   await makeArraysReady();
});


async function makePayment() {
   const stripe = await loadStripe(
      "pk_test_51QI7TFFhrY9kAnOUulUcBB0eCzbViF7a6yGQYhSQHF1PXcrzeJ06LjcEfbWot1tfAGJQ5Y7sNkbioCMjDfWxaQoU00pJ03zTns",
   );

   const body = {
      products:
      [{
         name: 'Books From Online Book Fair',
         booked: "yes",
         price: GrandTotalPrice.value,
      }]
   }

   const headers = {
      "Content-Type":"application/json"
   }
   const response = await fetch("http:/api/localhost:5000/create-checkout-session", {
      method:"POST",
      headers:headers,
      body:JSON.stringify(body)
   })

   const session = await response.json();

   const result = stripe.redirectToCheckout({
      sessionId:session.id
   })
   if(result.error){
      console.log('error in fetching ',result.error)
   }
}


</script>
<template>
   <div class="tw-flex tw-w-full tw-items-center tw-justify-center tw-p-2">
      <div class="tw-my-14 tw-w-[880px] tw-p-2">
         <div class="tw-flex tw-justify-center tw-bg-gray-200 tw-text-lg tw-font-bold tw-border-2 tw-border-[#020933]">
            <span
               class="tw-flex tw-w-20 tw-items-center tw-justify-center tw-border-r-2 tw-border-[#020933]  tw-p-1  tw-text-[#020933]">
               Image
            </span>
            <span
               class="tw-flex tw-w-80 tw-items-center tw-justify-center tw-border-r-2 tw-border-[#020933] tw-p-1  tw-text-[#020933]">
               Book
            </span>
            <span
               class="tw-flex tw-w-28 tw-items-center tw-justify-center tw-border-r-2 tw-border-[#020933] tw-p-1  tw-text-[#020933]">
               Quantity
            </span>
            <span
               class="tw-flex tw-w-20 tw-items-center tw-justify-center tw-border-r-2 tw-border-[#020933] tw-p-1  tw-text-[#020933]">
               More
            </span>
            <span
               class="tw-flex tw-w-20 tw-items-center tw-justify-center tw-border-r-2 tw-border-[#020933] tw-p-1  tw-text-[#020933]">
               Less
            </span>
            <span
               class="tw-flex tw-w-32 tw-items-center tw-justify-center tw-border-r-2 tw-border-[#020933] tw-p-1  tw-text-[#020933]">
               Total Price
            </span>
            <span
               class="tw-flex tw-w-20 tw-items-center tw-justify-center  tw-p-1  tw-text-[#020933]">
               Cancel
            </span>
         </div>
         <div
            v-for="(book, index) in global.globalSelectedBook"
            :key="index"
            class="tw-flex tw-justify-center tw-bg-gray-100 tw-text-lg tw-font-bold tw-border-x-2 tw-border-b-2 tw-border-[#020933]">
            <span
               class="tw-flex tw-w-20 tw-items-center tw-justify-center  tw-p-1  tw-text-[#020933]">
               <img
                  class="tw-h-16 tw-w-14"
                  :src="booksImagesArray[index]"
                  alt="" />
            </span>
            <span
               class="tw-flex tw-w-80 tw-items-center tw-justify-center  tw-p-1 tw-text-center  tw-text-yellow-600">
               {{ booksNamesArray[index] }}
            </span>
            <span
               class="tw-flex tw-w-28 tw-items-center tw-justify-center  tw-p-1  tw-text-yellow-600">
               {{ global.globalQuantity[index] }}
            </span>
            <span
               class="tw-flex tw-w-20 tw-items-center tw-justify-center  tw-p-1  tw-text-[#020933]">
               <i
                  @click="addQuantity(index)"
                  class="ri-add-line tw-cursor-pointer tw-text-3xl tw-font-semibold tw-text-yellow-600"></i>
            </span>
            <span
               class="tw-flex tw-w-20 tw-items-center tw-justify-center  tw-p-1  tw-text-[#020933]">
               <i
                  @click="MinusQuantity(index)"
                  class="ri-subtract-fill tw-cursor-pointer tw-text-3xl tw-font-semibold tw-text-yellow-600"></i>
            </span>
            <span
               class="tw-flex tw-w-32 tw-items-center tw-justify-center  tw-p-1  tw-text-green-700">
               ₹{{ booksTotalPriceArray[index] }}
            </span>
            <span
               class="tw-flex tw-w-20 tw-items-center tw-justify-center  tw-p-1  tw-text-[#020933]">
               <i
                  @click="removeBookFromCart(index)"
                  class="ri-close-circle-fill tw-cursor-pointer tw-text-3xl tw-font-semibold tw-text-red-600"></i>
            </span>
         </div>
         <div
            class="tw-my-10 tw-bg-gray-100 tw-text-lg tw-font-bold tw-flex tw-items-center  tw-justify-center tw-border-2 tw-border-[#020933]">
            <span
               class="tw-flex tw-w-32 tw-items-center tw-justify-center  tw-p-1  tw-text-[#020933]">
               Grand Total :
            </span>
            <span
               class="tw-flex tw-w-80 tw-items-center tw-justify-center  tw-p-1  tw-text-[#020933]">
               ₹{{ GrandTotalPrice }}
            </span>
            <span @click="makePayment"
               class="tw-my-3 tw-flex tw-h-10 tw-w-32 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-3xl tw-bg-yellow-600   tw-text-[#020933] tw-transition-colors tw-duration-700 hover:tw-bg-[#020933] hover:tw-text-white">
               Payment
            </span>
           
    
         </div>
      </div>
      
   
   </div>
</template>
