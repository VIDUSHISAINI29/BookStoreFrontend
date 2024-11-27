import {computed, ref} from "vue";
import { defineStore } from "pinia";
export const useGlobalStore = defineStore('global', () => {
    const numberOfBooks = ref(0);
    const arrayOfBooks = ref([]);
    return { numberOfBooks, arrayOfBooks }
})