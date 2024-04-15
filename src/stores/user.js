import { defineStore } from 'pinia'
import authService from "@/services/authService.js";

export default defineStore('user', {
    state: () => ({
        token: null,
        user: null,
    }),
})
