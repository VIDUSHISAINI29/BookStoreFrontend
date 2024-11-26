import {computed, ref} from "vue";
import { defineStore } from "pinia";
export const useGlobalStore = defineStore('global', () => {
    const numberOfBooks = ref(0);
    return { numberOfBooks }
})