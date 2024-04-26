import Api from '@/services/Api';

export default {
  joinCourse(access_id) {
    return Api().post('enrollments', { access_id });
  },
  denrolCourse(access_id) {
    console.log('access_id', { access_id });
    return Api().delete(`enrollments/${access_id}`);
  },
  getUsers() {
    return Api().get('users');
  },
  getUser(id) {
    return Api().get(`users/${id}`);
  },
  deleteUser(id) {
    return Api().delete(`users/${id}`);
  },
  switchRole(userId, role) {
    return Api().patch(`users/${userId}`, { role });
  },
  editUser(id, user) {
    return Api().patch(`users/${id}`, user);
  }
};
