<template>
  <div class="h-[100px] flex justify-between items-center">
    <h1 class="text-3xl font-arial pl-10 pr-5 font-bold text-ut-pink">{{ title }}</h1>
    <el-button
      @click="showJoin"
      v-if="isCoursesStudent()"
      type="primary"
      class="mr-10 mt-4 custom-button"
      >Join Course</el-button
    >
  </div>
  <!-- POPUP -->
</template>

<script>
// Importing necessary libraries and components
import { mapStores } from 'pinia'; // Importing mapStores function from pinia for accessing store
import useUserStore from '@/stores/user.js'; // Importing user store for accessing user data

export default {
  // Props received by the component
  props: ['title'],
  // Data properties for the component
  data() {
    return {
      // Initializing data properties
      isTeacher: null, // Flag to indicate if the user is a teacher
      showJoinCourse: false // Flag to control visibility of join course option
    };
  },
  // Methods for the component
  methods: {
    // Method to show join course option
    showJoin() {
      this.$emit('showJoin'); // Emitting 'showJoin' event to parent component
    },
    // Method to close join course option
    close() {
      this.showJoinCourse = false; // Setting showJoinCourse flag to false to hide join course option
    },
    // Method to check if the user is a student and title is 'My Courses'
    isCoursesStudent() {
      // Checking if the user role is 'student' and title is 'My Courses'
      if (this.userStore.user.role === 'student' && this.title === 'My Courses') {
        return true; // Return true if user is a student and title is 'My Courses'
      }
      return false; // Return false otherwise
    }
  },
  // Computed properties for the component
  computed: {
    ...mapStores(useUserStore) // Mapping user store to computed property for accessing user data
  },
  // Lifecycle hook called when the component is created
  created() {
    // Setting isTeacher flag based on user role when component is created
    this.isTeacher = this.userStore.user.role === 'teacher';
  }
};
</script>


<script setup></script>

<style>
.custom-button {
  background-color: #cf0072; /* This is for pink background */
  color: white; /* This is for white text */
  font-weight: bold;
  border-color: #cf0072;
}
</style>
