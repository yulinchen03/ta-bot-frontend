import { defineStore } from 'pinia'
import authService from "@/services/authService.js";

export default defineStore('user', {
    state: () => ({
        token: null,
        user: null,
    }),
    actions: {
        async logout() {

            try {
                await authService.logout()
                this.token = null
                this.user = null
            }
            catch(err) {
                //TODO handle error
                console.log(err)
            }
        },
    }
})
