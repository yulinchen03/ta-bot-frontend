import Api from '@/services/Api'


export default {
    getFeedback(courseId, assignmentId, exerciseId) {
        return Api().get(`/courses/${courseId}/assignments/${assignmentId}/exercises/${exerciseId}/feedbacks`)
    },
    deleteFeedback(courseId, assignmentId, exerciseId, feedbackId) {
        return Api().delete(`/courses/${courseId}/assignments/${assignmentId}/exercises/${exerciseId}/feedbacks/${feedbackId}`)
    },
    addFeedback(courseId, assignmentId, exerciseId, feedback) {
        return Api().post(`/courses/${courseId}/assignments/${assignmentId}/exercises/${exerciseId}/feedbacks`, {content: feedback})
    },
    changeFeedback(courseId, assignmentId, exerciseId, feedbackId, feedback) {
        return Api().patch(`/courses/${courseId}/assignments/${assignmentId}/exercises/${exerciseId}/feedbacks/${feedbackId}`, feedback)
    },
}