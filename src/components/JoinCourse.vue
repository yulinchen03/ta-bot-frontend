<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto flex justify-center"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Join New Course
              </h3>
              <div class="mt-2">
                <input
                  type="text"
                  placeholder="Course Code"
                  v-model="courseCode"
                  class="w-full px-3 py-2 placeholder-gray-500 border rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex justify-between">
          <el-button
            class="custom-button w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            @click="joinCourse(courseCode)"
          >
            Confirm
          </el-button>
          <el-button
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            @click="cancel"
          >
            Cancel
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'; // Importing ElMessage component from Element Plus library

export default {
  // Data properties for the component
  data() {
    return {
      // Initializing data property to store course code
      courseCode: ''
    };
  },
  // Methods for the component
  methods: {
    // Method to handle joining a course
    joinCourse(courseCode) {
      // Check if the course code is empty
      if (courseCode === '') {
        // Show error message if course code is empty
        ElMessage({
          message: 'Please enter a course code',
          type: 'error'
        });
      } else {
        // Emit 'join' event with the provided course code
        this.$emit('join', courseCode);
      }
    },
    // Method to cancel joining a course
    cancel() {
      // Emit 'close' event to cancel the operation
      this.$emit('close');
    }
  }
};
</script>


<style>
.custom-button {
  background-color: #cf0072; /* This is for pink background */
  color: white; /* This is for white text */
  font-weight: bold;
  border-color: #cf0072;
}
</style>
