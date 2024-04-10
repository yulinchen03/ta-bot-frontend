import Api from '@/services/Api'
import {createRouterMatcher as Promise} from "vue-router";


export default {
    getUsers() {
        return Api().get('users')
    },
    getUser(id) {
        return Api().get(`users/${id}`)
    },
    deleteUser(id) {
        return Api().delete(`users/${id}`)
    },
    promoteToTeacher(userId) {
        return Api().patch(`users/${userId}`)
    },
    demoteToStudent(userId) {
        return Api().patch(`users/${userId}`)
    },
    editUser(id, user) {
        return Api().patch(`users/${id}`, user)
    },
    getCourses() {
        return Api().get('courses')
    },
    deleteCourse(id) {
        return Api().delete(`courses/${id}`)
    },
    editCourse(id, course) {
        return Api().patch(`courses/${id}`, course)
    }
}
