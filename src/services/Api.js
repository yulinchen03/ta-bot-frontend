import axios from 'axios'
import useUserStore from '../stores/user.js'


const baseURL = 'https://tabot-backend-to7n.onrender.com'

export default () => {
    const userStore = useUserStore()
    if(userStore.token === null) {
        return axios.create({
            baseURL: baseURL,
        })
    }
    else {
        return axios.create({
            baseURL: baseURL,
            headers: {
                Authorization: `Bearer ${userStore.token}`
            },
        })
    }

}
