import './assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(
    createAuth0({
      domain: import.meta.env.VITE_DOMAIN,
      clientId: import.meta.env.VITE_CLIENTID,
 
      authorizationParams: {
        redirect_uri: import.meta.env.VITE_CALLBACK_URL
      }
    })
  );
app.mount('#app')
