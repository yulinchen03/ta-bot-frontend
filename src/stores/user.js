import { defineStore } from 'pinia'
import authService from "@/services/authService.js";

export default defineStore('user', {
    state: () => ({
        token: '',
        user: null,
    }),
    actions: {
        async login(email, password) {
            try {
                const res = await authService.login(email, password)
                console.log(res)
                console.log(res.headers)

                this.token = res.headers.authorization.split(' ')[1]
                this.user = { email: res.data.data.email, name: res.data.data.username, role: res.data.data.role}

                console.log('token:', this.token)
                console.log('user:', this.user)

            }
            catch(err) {
                //TODO handle error
                console.log(err)
            }
        },
        async register(email, password, confirm_password) {
            try {
                const res = await authService.register(name, email, password, confirm_password)

                this.token = res.headers.authorization.split(' ')[1]
                this.user = { email: res.data.data.email, name: res.data.data.username, role: res.data.data.role}

                console.log('token:', this.token)
                console.log('user:', this.user)

            }
            catch(err) {
                //TODO handle error
                console.log(err)
                return err
            }
        },
        async logout() {

            try {
                await authService.logout()
                this.token = ''
                this.user = null
            }
            catch(err) {
                //TODO handle error
                console.log(err)
            }
        },
    }
})
