<script setup>
// Composition API
import { useAuth0 } from '@auth0/auth0-vue';

    const auth0 = useAuth0();

      function logout() {
        auth0.logout({ 
          logoutParams: { 
            returnTo: window.location.origin 
          } 
        });
      }
 
  
</script>

<template>
    <div class="tw-h-screen">
      <button @click="logout">Log out</button>
    </div>
  </template>
