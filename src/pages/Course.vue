<template>
        <!-- teacher course page if teacher -->
        <div v-if="isTeacher">
            <TeacherCourse />
        </div>
        <!-- student course page if student -->
        <div v-else>
            <StudentCourse />
        </div>
</template>

<script>
import TeacherCourse from '../components/TeacherCourse.vue';
import StudentCourse from '../components/StudentCourse.vue';

export default {
    components: {
        TeacherCourse,
        StudentCourse
    },
    data() {
        return {
            isTeacher: true
        }
    }
}
</script>

