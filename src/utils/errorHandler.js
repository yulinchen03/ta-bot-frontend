import {ElMessage} from "element-plus";
import useUserStore from "@/stores/user.js";
import router from "@/router";

export default function errorHandler(error) {

    console.log(error)

    // if(error.response.status === 401){
    //     const store = useUserStore()
    //
    //     store.user = null;
    //     store.token = null
    //
    //     return router.push({name: 'Login'})
    // }

    return ElMessage({
        message: error?.response?.data?.status?.message || error.response.data,
        type: 'error'
    })
}