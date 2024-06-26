import Api from '@/services/Api';

export default {
  getExercises(courseId, assignmentId) {
    return Api().get(`courses/${courseId}/assignments/${assignmentId}/exercises`);
  },
  getExercise(courseId, assignmentId, exerciseId) {
    return Api().get(`courses/${courseId}/assignments/${assignmentId}/exercises/${exerciseId}`);
  },
  addExercises(courseId, assignmentId, exercise) {
    return Api().post(
      `courses/${courseId}/assignments/${assignmentId}/exercises?with_start_node=true`,
      exercise
    );
  },
  changeExercises(courseId, assignmentId, exerciseId, exercise) {
    return Api().put(
      `courses/${courseId}/assignments/${assignmentId}/exercises/${exerciseId}`,
      exercise
    );
  },
  deleteExercises(courseId, assignmentId, exerciseId) {
    return Api().delete(`courses/${courseId}/assignments/${assignmentId}/exercises/${exerciseId}`);
  },
  getTreeStructure(courseId, assignmentId, exerciseId) {
    return Api().get(
      `/courses/${courseId}/assignments/${assignmentId}/exercises/${exerciseId}/tree`
    );
  },
  renameExercise(courseId, assignmentId, exerciseId, name) {
    return Api().patch(`/courses/${courseId}/assignments/${assignmentId}/exercises/${exerciseId}`, {
      identifier: name
    });
  }
};
