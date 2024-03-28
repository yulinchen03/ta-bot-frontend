import Api from '@/services/Api'


export default {
    register(username, email, password, password_confirmation) {
        return Api().post('register',
            {
                user: {
                    username, email, password, password_confirmation
                }
    })
    },
    login(email, password) {
        return Api().post('login',
            {
                "user": {
                    email, password
                }
            })
    },
    logout(){
        return Api().delete('logout')
    },
    getCurrentUser() {
        return Api().get('current_user')
    }
}