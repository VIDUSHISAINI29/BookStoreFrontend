import {computed, reactive, ref} from "vue";
import { defineStore } from "pinia";
export const useGlobalStore = defineStore('global', () => {
    const numberOfBooks = ref(0);
    const arrayOfBooks = ref([]);
    const globalSelectedBook = ref([]);
    const globalQuantity = ref([]);
    const profileImg = ref('/images/profileIcon.png');
    const profileName = ref('');
    const profileEmail = ref('');
    return { numberOfBooks, arrayOfBooks, globalSelectedBook, globalQuantity, profileImg, profileName, profileEmail }
})