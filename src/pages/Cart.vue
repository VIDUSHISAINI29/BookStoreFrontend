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
   if(GrandTotalPrice.value === 0){
      alert('Select Item To Buy')
   }
  else{
   const stripe = await loadStripe(
      "pk_test_51QI7KACIEPPiVuoMvRzvpob8SYpLse3Rsro4w2XADTAqPycbcJJreif4aQuIfkBDxly9PGtPqmByYRfH1kMx2OMQ008r15oZ34",
   );

   const body = {
      products:
      [{
         name: 'Books From Online Book Fair',
         booked: "yes",
         price: GrandTotalPrice.value,
         qty: 1,
      }]
   }

   const headers = {
      "Content-Type":"application/json"
   }
   const response = await fetch("http://localhost:5000/api/create-checkout-session", {
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
}
console.log(global.numberOfBooks);


</script>
<template>
   <div class="tw-flex tw-w-full tw-bg-gray-100 tw-items-center tw-justify-center tw-p-2">
      <div class="tw-my-10 tw-w-full lg:tw-hidden tw-flex tw-flex-col tw-items-center">
         <div v-if="global.numberOfBooks == 0" class="tw-my-7 tw-flex tw-flex-col tw-gap-4 tw-items-center tw-justify-center"> 
      <img class="tw-w-52 tw-rounded-md tw-shadow-2xl tw-h-40" src="/images/emptyCart.jpg" alt="">
      <span class="tw-text-[#020933] tw-font-semibold tw-text-lg">
            Select Item to buy.
         </span>
   </div>
         <div      v-for="(book, index) in global.globalSelectedBook"
            :key="index" class="tw-flex tw-flex-col tw-bg-white sm:tw-w-11/12 tw-w-full tw-mt-4 tw-shadow-2xl tw-rounded-lg lg:tw-hidden sm:tw-p-3 tw-p-1">
           
            <div class="tw-flex ">
               <img class="tw-h-20 tw-w-16 sm:tw-w-20 sm:tw-h-24" :src="booksImagesArray[index]" alt="">
            
               <div class="tw-flex tw-flex-col tw-relative sm:tw-p-3 tw-w-4/5">
                  <span class="tw-text-[13px] sm:tw-text-base tw-px-1 tw-text-[#020933] tw-font-semibold"> {{ booksNamesArray[index] }}</span>
                  <span class="tw-text-[11px] sm:tw-text-sm tw-px-1 tw-text-[#020933]">  Quantity : {{ global.globalQuantity[index] }}</span>
                  <span class="tw-text-[13px] sm:tw-text-base tw-px-1 tw-text-[#020933] tw-font-semibold">Price:  ₹{{ booksTotalPriceArray[index] }}</span>
                  <span @click="addQuantity(index)" class="tw-text-[13px]  sm:tw-text-base tw-px-1 tw-font-semibold tw-rounded-sm tw-absolute tw-bg-[#020933] tw-text-white tw-bottom-0 tw-right-0"><i class="ri-add-line"></i></span>
                  <span @click="MinusQuantity(index)" class="tw-text-[13px] sm:tw-text-base tw-px-1 tw-rounded-sm   tw-font-semibold tw-absolute tw-bg-[#020933] tw-text-white tw-bottom-0 tw-right-9"><i class="ri-subtract-line"></i></span>
                  <span  @click="removeBookFromCart(index)" class="tw-text-[13px] sm:tw-text-xl tw-px-1   tw-rounded-sm tw-font-semibold tw-absolute  tw-text-red-700 tw-top-0 tw-text-lg tw-right-1"><i class="ri-close-line"></i></span>
               </div>
            </div>
         </div>
         <div
            class="tw-my-10 tw-rounded-md lg:tw-hidden tw-w-11/12 sm:tw-text-base tw-text-sm tw-font-bold tw-flex tw-justify-around tw-items-center tw-py-2 tw-bg-white tw-shadow-2xl tw-border-[#020933]">
          <div class="tw-flex">
            <span
               class="tw-flex   tw-items-center tw-justify-center  tw-p-1  tw-text-[#020933]">
               Grand Total :
            </span>
            <span
               class="tw-flex  tw-items-center tw-justify-center  tw-p-1  tw-text-[#020933]">
               ₹{{ GrandTotalPrice }}
            </span>
          </div>
          <div>
            <span @click="makePayment"
               class="tw-my-3 tw-flex tw-py-1 tw-px-2 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-3xl tw-bg-yellow-600   tw-text-[#020933] tw-transition-colors tw-duration-700 hover:tw-bg-[#020933] hover:tw-text-white">
               Payment
            </span>
          </div>
           
    
         </div>
        
      </div>
      <div class="tw-my-14 lg:tw-flex tw-hidden tw-items-center tw-justify-center lg:tw-flex-col tw-w-[880px] tw-p-2">
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
            class="tw-my-10 tw-px-4 tw-bg-gray-100 tw-text-lg tw-font-bold tw-flex tw-items-center  tw-justify-center tw-border-2 tw-border-[#020933]">
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
