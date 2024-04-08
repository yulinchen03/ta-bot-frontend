import Api from '@/services/Api'


export default {
    joinCourse(access_id) {
        return Api().post('enrollments', { access_id })
    },
    denrolCourse(access_id) {
        return Api().delete(`enrollments`, {access_id})
    }
}
