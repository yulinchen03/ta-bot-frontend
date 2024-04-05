import Api from '@/services/Api'


export default {
    getAssignments(courseId) {
        return Api().get(`courses/${courseId}/assignments`)
    },
    getAssignmentsWithExercises(courseId) {
        return Api().get(`courses/${courseId}/assignments?with_exercises=true`)
    },
    getAssignment(courseId, assignmentId) {
        return Api().get(`courses/${courseId}/assignments/${assignmentId}`)
    },
    addAssignment(courseId, assignment) {
        return Api().post(`courses/${courseId}/assignments`, assignment)
    },
    changeAssignment(courseId, assignmentId, assignment) {
        return Api().put(`courses/${courseId}/assignments`, assignment)
    },
    deleteAssignment(courseId, assignmentId) {
        return Api().delete(`courses/${courseId}/assignments/${assignmentId}`)
    },
    
}