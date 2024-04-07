import Api from '@/services/Api'


export default {
    register(name, surname, email, password, password_confirmation) {
        return Api().post('signup',
            {
                "user": {
                    name, surname, email, password, password_confirmation
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
    },
    updateUser(changes) {
        changes["current_password"] = "Password123"

        console.log(changes)
        return Api().patch('signup', {
            "user": changes
        })
    },
    updateUserPassword(current_password, encrypted_password) {
        return Api().patch('signup', {
            "user": {
                current_password, encrypted_password
            }
        })
    },
    deleteUser() {
        return Api().delete('signup')
    }
}