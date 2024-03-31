<template>
    <div v-if="isTeacher">
        <TeacherCourses />
    </div>
    <div v-else>
        <StudentCourses />
    </div>
</template>

<script>
import TeacherCourses from '../components/TeacherCourses.vue';
import StudentCourses from '../components/StudentCourses.vue';

export default {
    components: {
        TeacherCourses,
        StudentCourses
    },
    data() {
        return {
            isTeacher: true
        }
    }
}
</script>