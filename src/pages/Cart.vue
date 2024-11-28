<script setup>
import{ useGlobalStore} from "@/stores/global.js"
import { onMounted, ref, watch } from "vue";
const global = useGlobalStore();

const booksImagesArray = ref([]);
const booksNamesArray = ref([]);
const booksQuantityArray = ref([]);
const booksTotalPriceArray = ref([]);
const arrayForLoop = ref([]);
const GrandTotalPrice = ref(0);
const unitPricesArray = ref([]);



async function makeArraysReady(){
   booksImagesArray.value = []; // Reset the array
  booksNamesArray.value = [];
  booksQuantityArray.value = [];
  booksTotalPriceArray.value = [];
  unitPricesArray.value = [];

for(let i = 0; i < global.globalSelectedBook.length; i++){
   await booksImagesArray.value.push(global.globalSelectedBook[i].image)
   await booksNamesArray.value.push(global.globalSelectedBook[i].bookName.split('(')[0])
    booksQuantityArray.value = await global.globalQuantity

   const totalPrice = await global.globalQuantity[i] * parseInt(global.globalSelectedBook[i].price.slice(1,4))
   unitPricesArray.value.push(totalPrice/booksQuantityArray.value[i]);
   
   booksTotalPriceArray.value.push(totalPrice)
   GrandTotalPrice.value += totalPrice
}
global.numberOfBooks = global.globalSelectedBook.length 

}

function addQuantity(index){
   global.globalQuantity[index] += 1;
   const totalPrice = global.globalQuantity[index] * parseInt(global.globalSelectedBook[index].price.slice(1,4));
   booksTotalPriceArray.value[index] = totalPrice;
   GrandTotalPrice.value += unitPricesArray.value[index];
   console.log('grand total add operation');
}
function MinusQuantity(index){
   if(global.globalQuantity[index] > 0){
      global.globalQuantity[index] -= 1 ;
   }
   if(global.globalQuantity[index] === 0){
      removeBookFromCart(index)
   }
   const totalPrice = global.globalQuantity[index] * parseInt(global.globalSelectedBook[index].price.slice(1,4));
   booksTotalPriceArray.value[index] = totalPrice;
   const boolean = booksTotalPriceArray.value[index] > unitPricesArray.value[index]
   console.log('first Value ',booksTotalPriceArray.value );
   console.log('second Value ',unitPricesArray.value );
   
   console.log('boolear = ',boolean);
   
   if(global.globalQuantity[index] >= 1){
      GrandTotalPrice.value -= unitPricesArray.value[index]
   }
}
async function removeBookFromCart(index){
   console.log('removing index', index);
   if(GrandTotalPrice.value > 0){
      GrandTotalPrice.value -= booksTotalPriceArray.value[index]
   }
   global.globalSelectedBook.splice(index,1);
   global.globalQuantity.splice(index,1);
   booksTotalPriceArray.value.splice(index,1);
   console.log('books array  after removing elem', global.globalQuantity);
  
}
onMounted( async () => {
   await makeArraysReady();
})
watch(() => global.globalSelectedBook, async(newValue, oldValue) => {
   await makeArraysReady();
   console.log("Arrays updated:", {
    booksImagesArray: booksImagesArray.value,
    booksNamesArray: booksNamesArray.value,
    booksQuantityArray: booksQuantityArray.value,
    booksTotalPriceArray: booksTotalPriceArray.value,
    unitPriceValue: unitPricesArray.value,
  });

}, { deep: true });

</script>
<template>
    <div class="tw-w-full  tw-p-2 tw-flex tw-justify-center tw-items-center">
        <div class="tw-w-[880px] tw-my-14 tw-p-2">
            <div class=" tw-flex tw-justify-center tw-border-2 tw-border-[#020933]">
                <span class="tw-w-20 tw-bg-gray-100 tw-border-r-2 tw-border-[#020933] tw-justify-center tw-items-center tw-flex tw-p-1 tw-text-[#020933] tw-text-lg tw-font-bold">Image</span>
                <span class="tw-w-80 tw-border-r-2 tw-border-[#020933] tw-bg-gray-50 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold">Book</span>
                <span class="tw-w-28 tw-border-r-2 tw-border-[#020933] tw-bg-gray-50 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold">Quantity</span>
                <span class="tw-w-20 tw-border-r-2 tw-border-[#020933] tw-bg-gray-50 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold">More</span>
                <span class="tw-w-20 tw-border-r-2 tw-border-[#020933] tw-bg-gray-50 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold">Less</span>
                <span class="tw-w-32 tw-border-r-2 tw-border-[#020933] tw-bg-gray-50 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold">Total Price</span>
                <span class="tw-w-20 tw-bg-gray-100 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold">Cancel</span>
            </div>
            <div v-for="(book, index) in global.globalSelectedBook" :key="index" class="tw-border-b-2 tw-border-x-2 tw-border-[#020933]  tw-flex tw-justify-center">
                <span class="tw-w-20 tw-bg-gray-50 tw-justify-center tw-items-center tw-flex tw-p-1 tw-text-[#020933] tw-text-lg tw-font-bold"><img class="tw-w-14 tw-h-16" :src="booksImagesArray[index]" alt=""></span>
                <span class="tw-w-80 tw-bg-gray-50 tw-flex tw-p-1 tw-text-center tw-justify-center tw-items-center  tw-text-yellow-600 tw-text-lg tw-font-bold">{{booksNamesArray[index]}}</span>
                <span class="tw-w-28 tw-bg-gray-50 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-yellow-600 tw-text-lg tw-font-bold">{{ global.globalQuantity[index] }}</span>
                <span class="tw-w-20 tw-bg-gray-50 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold"><i @click="addQuantity(index)" class="tw-cursor-pointer tw-font-semibold tw-text-yellow-600 tw-text-3xl ri-add-line"></i></span>
                <span class="tw-w-20 tw-bg-gray-50 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold"><i @click="MinusQuantity(index)" class="tw-cursor-pointer tw-font-semibold tw-text-yellow-600 tw-text-3xl ri-subtract-fill"></i></span>
                <span class="tw-w-32 tw-bg-gray-50 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-green-700 tw-text-lg tw-font-bold">₹{{booksTotalPriceArray[index]}}</span>
                <span class="tw-w-20 tw-bg-gray-50 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold"><i @click="removeBookFromCart(index)" class="tw-cursor-pointer tw-font-semibold tw-text-red-600 tw-text-3xl ri-close-circle-fill"></i></span>
            </div>
            <div class=" tw-flex tw-justify-center tw-my-10 tw-border-2 tw-items-center tw-border-[#020933]">
                <span class="tw-w-32 tw-bg-gray-50  tw-justify-center tw-items-center tw-flex tw-p-1 tw-text-[#020933] tw-text-lg tw-font-bold">Grand Total : </span>
                <span class="tw-w-80  tw-bg-gray-50 tw-flex tw-p-1  tw-justify-center tw-items-center  tw-text-[#020933] tw-text-lg tw-font-bold">₹{{GrandTotalPrice}}</span>
                <span 
               class="tw-my-3 tw-flex tw-h-10 tw-w-32 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-3xl tw-bg-yellow-600 tw-text-lg tw-font-semibold tw-text-[#020933] tw-transition-colors tw-duration-700 hover:tw-bg-[#020933] hover:tw-text-white">
               Payment
            </span>
              
            </div>
        </div>
    </div>
</template>