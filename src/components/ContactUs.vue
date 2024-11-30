<script setup>
import emailjs from "@emailjs/browser";
import { ref } from "vue";

const form = ref({
   name: "",
   email: "",
   message: "",
   phone: "",
});
const statusMessage = ref("");

function sendEmail() {
   emailjs
      .send(
         "service_xkgfmnh",
         "template_yskfgsl",
         {
            from_name: form.value.name,
            from_email: form.value.email,
            message: form.value.message,
            phone: form.value.phone,
         },
         "YqUOTxOFSO_7y80hb",
      )
      .then(
         (response) => {
            console.log("SUCCESS!", response.status, response.text);
            statusMessage.value = "Message sent successfully!";
            form.value.name = "";
            form.value.email = "";
            form.value.message = "";
            form.value.phone = "";
         },
         (error) => {
            console.error("FAILED...", error);
            statusMessage.value = "Failed to send message. Please try again.";
         },
      );
}
</script>

<template>
      <div id="sectionContacts"
               class="  tw-flex tw-w-4/5 tw-flex-col tw-gap-14 tw-py-10 tw-items-center tw-bg-white  sm:tw-w-full">
               <div
                  class=" tw-flex md:tw-w-11/12 tw-flex-col tw-rounded-lg tw-justify-center  tw-p-1 tw-text-2xl tw-font-semibold tw-text-[#020933] sm:tw-w-full md:tw-py-3 md:tw-text-4xl">
                  <span class=" tw-cursor-pointer tw-w-60 tw-text-center hover:tw-text-white tw-transition-colors tw-duration-500 tw-rounded-tr-lg tw-rounded-tl-lg tw-py-1 hover:tw-bg-[#020933]">Contact Us</span>
                  <span class="tw-bg-[#020933] tw-h-[4px] tw-w-60"></span>
                 
               </div>
               <div
                  class="tw-flex tw-mt-3 tw-mb-32 md:tw-mr-80  tw-relative md:tw-w-[40%] tw-justify-center md:tw-justify-start  md:tw-flex md:tw-flex-row ">
                  <img class="tw-w-[500px]  tw-h-96 tw-rounded-xl" src="/images/booksStoreContactUs.jpg" alt="">
                  <form
                     class="tw-flex tw-absolute tw-w-[200px] md:tw-w-96 tw-top-[110px] -tw-right-[250px] tw-rounded-xl tw-bg-white tw-pt-10 tw-flex-col tw-items-center tw-shadow-2xl  tw-gap-5 tw-p-2 sm:tw-w-80"
                     @submit.prevent="sendEmail"
                     id="contactForm">
                     <input
                        class="tw-w-full tw-rounded-sm tw-border-b-2 tw-border-yellow-600 tw-bg-[#fff] tw-p-1 tw-text-[#020933] tw-outline-none"
                        type="text"
                        v-model="form.name"
                        placeholder="Your Name"
                        required />
                     <input
                        class="tw-w-full tw-rounded-sm tw-border-b-2 tw-border-yellow-600 tw-bg-[#fff] tw-p-1 tw-text-[#020933] tw-outline-none"
                        type="email"
                        v-model="form.email"
                        placeholder="Your Email"
                        required />
                     <input
                        class="tw-w-full tw-rounded-sm tw-border-b-2 tw-border-yellow-600 tw-bg-[#fff] tw-p-1 tw-text-[#020933] tw-outline-none"
                        type="tel"
                        v-model="form.phone"
                        placeholder="Your Phone Number"
                        required />
                     <textarea
                        class="tw-w-full tw-rounded-sm tw-border-b-2 tw-border-yellow-600 tw-bg-[#fff] tw-p-1 tw-text-[#020933] tw-outline-none"
                        v-model="form.message"
                        placeholder="Your Message"
                        required></textarea>
                        <span 
               class="tw-my-3 tw-flex tw-h-10 tw-w-32 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-xl tw-bg-[#020933] hover:tw-text-[#020933] tw-text-base tw-font-semibold tw-text-white tw-transition-colors tw-duration-700 hover:tw-bg-yellow-600 ">
               Send Messsage
            </span>
                  </form>
                  <span class="tw-text-black tw-absolute tw-top-0">{{ statusMessage }}</span>
               </div>
               <div class="tw-w-4/5 tw-flex  tw-justify-around tw-gap-20">
                  <div class="tw-flex tw-gap-1 tw-w-60 tw-text-[#020933] tw-font-semibold tw-text-lg  tw-p-1">
                     <div class="tw-w-14 hover:tw-shadow-whiteShadow hover:tw-bg-white  hover:tw-border-yellow-600 tw-cursor-pointer tw-transition-colors tw-duration-300  tw-text-center tw-flex tw-justify-center tw-items-center tw-border-2 tw-border-[#020933] tw-p-1">
                     <i class="ri-phone-line hover:tw-text-sky-600  tw-transition-colors tw-duration-300 hover:tw-bg-white tw-text-4xl"></i>
                    </div>
                     <div class="tw-flex tw-px-1 tw-flex-col">
                        <span>Mobile Number :</span>
                     <span>+91-904982XXXX</span>
                     </div>
                  </div>
                  <div class="tw-flex tw-gap-1 tw-w-[300px]  tw-text-[#020933] tw-font-semibold tw-text-lg  tw-p-1">
                     <div class="tw-w-14 hover:tw-shadow-whiteShadow hover:tw-bg-white  hover:tw-border-yellow-600 tw-cursor-pointer tw-transition-colors tw-duration-300  tw-text-center tw-flex tw-justify-center tw-items-center tw-border-2 tw-border-[#020933] tw-p-1">
                     <i class="ri-mail-line hover:tw-text-[#ea4335] tw-transition-colors tw-duration-300 hover:tw-bg-white tw-text-4xl"></i>
                    </div>
                     <div class="tw-flex tw-px-1 tw-flex-col">
                        <span>Email :</span>
                     <span>onlinebookfair@gmail.com</span>
                     </div>
                  </div>
                  <div class="tw-flex  tw-w-72 tw-text-[#020933] tw-font-semibold tw-text-lg  tw-p-1">
                    <div class="tw-w-14 hover:tw-shadow-whiteShadow tw-text-center hover:tw-bg-white hover:tw-border-yellow-600 tw-cursor-pointer tw-transition-colors tw-duration-300 tw-flex tw-justify-center tw-items-center tw-border-2 tw-border-[#020933] tw-p-1">
                     <i class="ri-whatsapp-line hover:tw-text-[#1daa61] tw-transition-colors tw-duration-300 hover:tw-bg-white tw-text-4xl"></i>
                    </div>
                     <div class="tw-flex tw-px-1  tw-flex-col ">
                        <span>Whatsapp :</span>
                     <span>+91-836542XXXX</span>
                     </div>
                  </div>
               </div>
               
            </div>
</template>