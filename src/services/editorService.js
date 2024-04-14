import Api from '@/services/Api'

export default {
    getTree(course_id, assignment_id, exercise_id) {
        return Api().get(`courses/${course_id}/assignments/${assignment_id}/exercises/${exercise_id}/hint_nodes?with_edges=true`)
    },
    getExercise(courseId, assignmentId, exerciseId) {
        return Api().get(`courses/${courseId}/assignments/${assignmentId}/exercises/${exerciseId}`)
    },
    getAssignment(courseId, assignmentId) {
        return Api().get(`courses/${courseId}/assignments/${assignmentId}`)
    },
    getCourse(courseId) {
        return Api().get(`courses/${courseId}`)
    },
    getHintNode(courseId, assignmentId, exerciseId, hintNodeId) {
        return Api().get(`courses/${courseId}/assignments/${assignmentId}/exercises/${exerciseId}/hint_nodes/${hintNodeId}?with_edges=true`)
    },
    createHintNode(courseId, assignmentId, exerciseId, parentNodeId, option) {
        return Api().post(`courses/${courseId}/assignments/${assignmentId}/exercises/${exerciseId}/hint_nodes/${parentNodeId}/create_and_link`, {
            option
        })
    },
    editNode(courseId, assignmentId, exerciseId, hintNodeId, name, description){
        return Api().patch(`courses/${courseId}/assignments/${assignmentId}/exercises/${exerciseId}/hint_nodes/${hintNodeId}`, {
            "name": name,
            "description": description
        })
    },
    editEdge(courseId, assignmentId, exerciseId, hintNodeId, edgeId, option){
        return Api().patch(`courses/${courseId}/assignments/${assignmentId}/exercises/${exerciseId}/hint_nodes/${hintNodeId}/edges/${edgeId}`, {
            "option": option
        })
    },
    deleteNode(courseId, assignmentId, exerciseId, hintNodeId) {
        return Api().delete(`courses/${courseId}/assignments/${assignmentId}/exercises/${exerciseId}/hint_nodes/${hintNodeId}`)
    },
}