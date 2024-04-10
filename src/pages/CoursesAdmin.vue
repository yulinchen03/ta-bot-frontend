<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <!-- Sidebar -->
    <Sidebar></Sidebar>
    <!-- Main content -->
    <div class="grid grid-cols-1 relative h-screen w-screen">
      <Header :title="pageTitle"></Header>
      <div class="mx-20 overflow-y-auto w-[calc(100vw-200px)] h-[calc(100vh-100px)] flex flex-col gap-3 ">
        <!-- Search Bar -->
        <input class="p-2 w-full rounded-lg" type="text" v-model="searchQuery" placeholder="Search by name, or access_id">
        <!-- List of Course Cards -->
        <CourseCard v-for="course in filteredCourses" :key="course.access_id" :course="course" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import { mapStores } from "pinia";
import useUserStore from "@/stores/user.js";
import PersonCard from "@/components/PersonCard.vue";
import userService from "@/services/userService.js";
import { ElMessage } from "element-plus";
import CourseCard from "@/components/CourseCard.vue";
import courseService from "@/services/courseService.js";

export default {
  components: {
    CourseCard,
    PersonCard,
    Header,
    Sidebar,
  },
  data() {
    return {
      pageTitle: 'My Courses',
      searchQuery: '',
      courses: [
        {
          name: 'Software System',
          access_id: '3ds72',
          instructor: 'Steve Jobs'
        },
        {
          name: 'Computer Networks',
          access_id: '9ejd2',
          instructor: 'Grace Hopper'
        },
        {
          name: 'Algorithms and Data Structures',
          access_id: 'kxj89',
          instructor: 'Donald Knuth'
        },
        {
          name: 'Machine Learning',
          access_id: 'pqr45',
          instructor: 'Andrew Ng'
        },
        {
          name: 'Database Systems',
          access_id: 'lmo37',
          instructor: 'Edgar Codd'
        },
        {
          name: 'Operating Systems',
          access_id: 'vxy91',
          instructor: 'Linus Torvalds'
        },
        {
          name: 'Web Development',
          access_id: 'abc123',
          instructor: 'Tim Berners-Lee'
        }
      ],
      editCourse: {
        course_name: '',
        access_id: ''
      }
    }
  },
  computed: {
    filteredCourses() {
      const query = this.searchQuery.toLowerCase();
      return this.courses.filter(course => {
        return course.name.toLowerCase().includes(query) ||
            course.access_id.toLowerCase().includes(query) ||
            course.instructor.toLowerCase().includes(query)
      });
    }
  },
  created() {
    // this.refresh()
  },
  methods: {
    async refresh() {
      try {
        const res = (await courseService.getCourses()).data.data
        this.courses = res
      } catch (err) {
        ElMessage({
          showClose: true,
          message: err.response.data.message,
          type: 'error'
        })
      }
    },
    async deleteCourse(courseId) {
      try {
        await courseService.deleteCourse(courseId)
        this.refresh()
        ElMessage({
          showClose: true,
          message: 'Course deleted successfully',
          type: 'success'
        })
      } catch (err) {
        ElMessage({
          showClose: true,
          message: err.response.data.message,
          type: 'error'
        })
      }
    },
    async editCourse(courseId) {
      try {
        await courseService.editCourse(courseId, {
          name: this.editCourse.name,
          access_id: this.editCourse.access_id
        })
        this.refresh()
        ElMessage({
          showClose: true,
          message: 'Course edited successfully',
          type: 'success'
        })
      } catch (err) {
        ElMessage({
          showClose: true,
          message: err.response.data.message,
          type: 'error'
        })
      }
    }
  }
}
</script>