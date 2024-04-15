<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <!-- Sidebar -->
    <Sidebar></Sidebar>
    <!-- Main content -->
    <div class="grid grid-cols-1 relative h-screen w-screen overflow-x-clip">
      <Header :title="pageTitle"></Header>
      <div class="mx-10 w-[calc(100vw-120px)] h-[calc(100vh-100px)] flex flex-col gap-3">
        <!-- Search Bar -->
        <el-input class="p-2 rounded-lg" type="text" v-model="searchQuery" placeholder="Search by name, or access_id" style="width: 85vw"/>
        <!-- List of Course Cards -->
        <div class="overflow-y-scroll flex flex-col gap-3">
          <CourseCard @deleteCourse="deleteCourse(course.id)" @editCourseAdmin="editCourseAdmin"  v-for="course in filteredCourses" :key="course.access_id" :course="course" />
        </div>
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
      pageTitle: 'Course Management',
      searchQuery: '',
      courses: [],
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
            course.access_id.toLowerCase().includes(query)
            //  || course.teacherName.toLowerCase().includes(query);
      });
    }
  },
  created() {
    this.refresh()
  },
  methods: {
    async refresh() {
      try {
        const res = (await courseService.getCourses()).data.data
        console.log(res)
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
    async editCourseAdmin(courseId, body) {
      try {
        const {name} = body
        await courseService.changeCourse(courseId, {name})
        this.refresh()
        ElMessage({
          showClose: true,
          message: 'Course edited successfully',
          type: 'success'
        })
      } catch (err) {
        console.log(err)
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