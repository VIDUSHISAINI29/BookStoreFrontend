<script setup>
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import ContactUs from '@/components/ContactUs.vue'
</script>

<template>
   <div class="tw-relative">
      <Navbar />
      <router-view />
      <ContactUs />
      <Footer />
   </div>
</template>

<style scoped></style>
