import Api from '@/services/Api'


export default {
    getCourses() {
        return Api().get('courses')
    },
    getCourse(courseId) {
        return Api().get(`courses/${courseId}`)
    },
    addCourse(course) {
        return Api().post('courses', course)
    },
    changeCourse(courseId, course) {
        return Api().put(`courses/${courseId}`, course)
    },
    deleteCourse(courseId) {
        return Api().delete(`courses/${courseId}`)
    }
}
