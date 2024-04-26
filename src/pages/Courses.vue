<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <JoinCourse @join="joinCourse" @close="close" v-if="showJoinCourse"></JoinCourse>

    <!-- Sidebar -->
    <Sidebar></Sidebar>
    <!-- Main content -->
    <div class="grid grid-cols-1 relative h-screen w-screen">
      <PageHeader @showJoin="showJoinCourse = true" :title="pageTitle"></PageHeader>
      <div class="mx-20 overflow-y-auto w-[calc(100vw-200px)] h-[calc(100vh-100px)]">
        <!-- Dynamic rows -->
        <div
          v-if="isTeacher"
          v-for="(row, rowIndexTeacher) in coursesRows"
          :key="rowIndexTeacher"
          class="flex justify-start"
        >
          <Itemcard
            v-for="item in row"
            :key="item.id"
            :courseData="item"
            class="w-[calc(25vw-100px)]"
            @courseSelected="openCourse(item.id)"
            @deleteCourse="deleteCourse(item.id)"
          />
        </div>
        <div
          v-else
          v-for="(row, rowIndexStudent) in coursesRows"
          :key="rowIndexStudent"
          class="flex justify-start"
        >
          <Itemcard
            v-for="item in row"
            :key="item.id"
            :courseData="item"
            class="w-[calc(25vw-100px)]"
            @courseSelected="openCourse(item.id)"
            @deEnroll="deEnroll(item.access_id)"
          />
        </div>
      </div>
    </div>
    <el-dialog v-if="isTeacher" v-model="dialogFormVisible" title="Create Course" width="500">
      <el-form :model="courseForm">
        <el-form-item class="courses">
          <el-input v-model="courseForm.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer flex items-center justify-center">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button class="custom-button" @click="addCourse"> Create </el-button>
        </div>
      </template>
    </el-dialog>

    <el-button
      v-if="isTeacher"
      size="large"
      @click="dialogFormVisible = true"
      round
      class="fixed right-10 bottom-10 z-20 custom-button"
    >
      <el-icon class="mr-2"><Plus /></el-icon>
      Create a course
    </el-button>
  </div>
</template>

<script>
import PageHeader from '../components/Header.vue'; // Custom header component
import courseService from '@/services/courseService.js'; // API service for handling course-related requests
import { mapStores } from 'pinia'; // Pinia utility for integrating stores
import useUserStore from '@/stores/user.js'; // Store for user data
import { ElMessage } from 'element-plus'; // Element UI messaging component
import userService from '@/services/userService'; // API service for handling user-related requests
import Sidebar from '@/components/Sidebar.vue'; // Custom sidebar component
import Itemcard from '@/components/Itemcard.vue'; // Custom item card component
import JoinCourse from '@/components/JoinCourse.vue'; // Custom join course component
import errorHandler from '@/utils/errorHandler.js'; // General utility for handling errors

export default {
  components: {
    PageHeader,
    JoinCourse,
    Sidebar,
    Itemcard
  },
  data() {
    return {
      pageTitle: 'My Courses', // Title for the page
      courses: [], // Array to store course information
      isTeacher: null, // Role indicator if the user is a teacher
      courseForm: { // Form data for creating a new course
        name: ''
      },
      dialogFormVisible: false, // Controls visibility of the course creation dialog
      showJoinCourse: false // Controls visibility of the join course dialog
    };
  },
  methods: {
    // Add a new course using form data
    async addCourse() {
      try {
        await courseService.addCourse({ name: this.courseForm.name });
        await this.getCourses(); // Refresh the list of courses
        ElMessage({
          message: 'Course successfully created.',
          type: 'success'
        });
        this.dialogFormVisible = false; // Close the form dialog
        this.courseForm.name = ''; // Reset the form field
      } catch (err) {
        errorHandler(err); // Handle errors
      }
    },
    // Join a course using a provided course code
    async joinCourse(courseCode) {
      try {
        await userService.joinCourse(courseCode);
        ElMessage({
          message: 'Course joined successfully',
          type: 'success'
        });
        await this.getCourses(); // Refresh the list of courses
      } catch (err) {
        errorHandler(err); // Handle errors
      }
      this.showJoinCourse = false; // Close the join course dialog
    },
    // Fetch and update the list of courses
    async getCourses() {
      try {
        const res = await courseService.getCourses();
        this.courses = res.data.data; // Update courses with the received data
      } catch (err) {
        errorHandler(err); // Handle errors
      }
    },
    // Navigate to a specific course
    openCourse(id) {
      this.$router.push({ path: 'course', query: { id: id } });
    },
    // Delete a course by its ID
    async deleteCourse(id) {
      try {
        await courseService.deleteCourse(id);
        this.courses = this.courses.filter((course) => course.id !== id); // Remove the deleted course from the list
        ElMessage({
          message: 'Course successfully deleted.',
          type: 'success'
        });
      } catch (err) {
        errorHandler(err); // Handle errors
      }
    },
    // De-enroll from a course
    async deEnroll(id) {
      try {
        await userService.denrolCourse(id);
        ElMessage({
          message: 'Successfully de-enrolled from course.',
          type: 'success'
        });
        this.getCourses(); // Refresh the list of courses
      } catch (err) {
        errorHandler(err); // Handle errors
        this.getCourses(); // Ensure courses list is refreshed even if there's an error
      }
    },
    // Show the join course dialog
    showJoin() {
      this.showJoinCourse = true;
    },
    // Close the join course dialog
    close() {
      this.showJoinCourse = false;
    }
  },
  computed: {
    // Compute courses into rows for display purposes, grouping them by 4
    coursesRows() {
      const itemsPerRow = 4;
      const rows = [];
      for (let i = 0; i < this.courses.length; i += itemsPerRow) {
        rows.push(this.courses.slice(i, i + itemsPerRow));
      }
      return rows;
    },
    ...mapStores(useUserStore) // Map user store to access user data reactively
  },

  created() {
    this.getCourses(); // Fetch courses when component is created
    this.isTeacher = this.userStore.user.role === 'teacher'; // Determine if the user is a teacher
  }
};
</script>


<style scoped>
.transparent-delete-button {
  background-color: transparent;
  border-color: transparent;
  height: 60px;
  width: 60px;
  font-size: 30px;
}

.transparent-delete-button:hover {
  background-color: lightcoral;
  color: white;
  border-color: transparent;
}

.custom-button {
  background-color: #cf0072; /* This is for pink background */
  color: white; /* This is for white text */
  font-weight: bold;
  border-color: #cf0072;
}
</style>
