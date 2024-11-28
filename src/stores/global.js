import {computed, reactive, ref} from "vue";
import { defineStore } from "pinia";
export const useGlobalStore = defineStore('global', () => {
    const numberOfBooks = ref(0);
    const arrayOfBooks = ref([]);
    const globalSelectedBook = ref([]);
    const globalQuantity = ref([]);
    return { numberOfBooks, arrayOfBooks, globalSelectedBook, globalQuantity }
})