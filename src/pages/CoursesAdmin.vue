<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <!-- Sidebar -->
    <Sidebar></Sidebar>
    <!-- Main content -->
    <div class="grid grid-cols-1 relative h-screen w-screen overflow-x-clip">
      <Header :title="pageTitle"></Header>
      <div class="mx-10 w-[calc(100vw-120px)] h-[calc(100vh-100px)] flex flex-col gap-3">
        <!-- Search Bar -->
        <el-input
          class="p-2 rounded-lg"
          type="text"
          v-model="searchQuery"
          placeholder="Search by name, or access_id"
          style="width: 85vw"
        />
        <!-- List of Course Cards -->
        <div class="overflow-y-scroll flex flex-col gap-3 mb-2">
          <CourseCard
            @refresh="refresh"
            @deleteCourse="deleteCourse(course.id)"
            @editCourseAdmin="editCourseAdmin"
            v-for="course in filteredCourses"
            :key="course.access_id"
            :course="course"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'; // Custom header component for the app
import Sidebar from '@/components/Sidebar.vue'; // Custom sidebar component for navigation
import { ElMessage } from 'element-plus'; // Element UI component for showing messages
import CourseCard from '@/components/CourseCard.vue'; // Component to display individual courses
import courseService from '@/services/courseService.js'; // API service for handling course-related requests
import errorHandler from '@/utils/errorHandler.js'; // General utility for handling errors in API calls

export default {
  components: {
    CourseCard, // Register CourseCard component
    Header, // Register Header component
    Sidebar // Register Sidebar component
  },
  data() {
    return {
      pageTitle: 'Course Management', // Title of the page
      searchQuery: '', // Search query to filter courses
      courses: [], // Array to store courses data
      editCourse: { // Object to store data for editing a course
        course_name: '',
        access_id: ''
      }
    };
  },
  computed: {
    // Compute filtered courses based on the search query
    filteredCourses() {
      const query = this.searchQuery.toLowerCase();
      return this.courses.filter((course) => {
        return (
            course.name.toLowerCase().includes(query) || // Filter by course name
            course.access_id.toLowerCase().includes(query) // Filter by access ID
            // You can also add more filters here, like filtering by teacher's name
        );
      });
    }
  },
  created() {
    this.refresh(); // Fetch all courses when the component is created
  },
  methods: {
    // Method to fetch courses and handle the response
    async refresh() {
      try {
        const res = (await courseService.getCourses()).data.data; // Make API call to get courses

        this.courses = res; // Assign fetched courses to the courses array
      } catch (err) {
        errorHandler(err); // Handle errors if the API call fails
      }
    },
    // Method to delete a course by its ID
    async deleteCourse(courseId) {
      try {
        await courseService.deleteCourse(courseId); // Make API call to delete a course
        await this.refresh(); // Refresh course list after deletion
        ElMessage({
          showClose: true,
          message: 'Course deleted successfully',
          type: 'success'
        });
      } catch (err) {
        errorHandler(err); // Handle errors if the deletion fails
      }
    },
    // Method to edit course details
    async editCourseAdmin(courseId, body) {
      try {
        const { name } = body; // Destructure the name from the body object
        await courseService.changeCourse(courseId, { name }); // Make API call to update course details
        await this.refresh(); // Refresh course list after updating
        ElMessage({
          showClose: true,
          message: 'Course edited successfully',
          type: 'success'
        });
      } catch (err) {
        errorHandler(err); // Handle errors if the update fails
      }
    }
  }
};
</script>

