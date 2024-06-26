<template>
  <div
    class="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-102 hover:shadow-glow border-ut-pink"
  >
    <el-button
      v-if="isTeacher"
      @click="this.$emit('deleteCourse')"
      class="absolute right-1 top-1 z-50 transparent-delete-button"
    >
      <el-icon><Delete /></el-icon>
    </el-button>
    <el-button
      v-else
      @click="this.$emit('deEnroll')"
      class="absolute right-1 top-1 z-50 transparent-delete-button"
    >
      <el-icon><Delete /></el-icon>
    </el-button>
    <div @click="emitClickEvent">
      <div class="hover:shadow-lg">
        <img
          class="h-36 w-full object-cover"
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/Computer_Science_Word_Cloud.png"
        />
      </div>
      <div class="p-8">
        <div class="uppercase tracking-wide text-sm text-ut-pink font-semibold">
          {{ courseTitle }}
        </div>
        <p class="block mt-1 text-lg leading-tight font-medium text-black">{{ code }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'; // Importing mapStores function from Pinia
import useUserStore from '@/stores/user.js'; // Importing useUserStore from user store module

export default {
  // Props received by the component
  props: ['courseData'],
  // Events emitted by the component
  emits: ['courseSelected', 'deleteCourse', 'deEnroll'],
  // Lifecycle hook called when the component is mounted
  mounted() {
    // Call method to load data when the component is mounted
    this.loadData();
  },
  // Data properties for the component
  data() {
    return {
      // Initialize data properties
      courseTitle: '', // Title of the course
      code: '', // Course code
      join_code: '', // Join code for the course
      isTeacher: null // Flag to indicate if the user is a teacher
    };
  },
  // Methods for the component
  methods: {
    // Method to load data from props
    loadData() {
      // Assign values from props to data properties
      this.courseTitle = this.courseData['name']; // Assign course name
      this.code = this.courseData['code']; // Assign course code
      this.join_code = this.courseData['join_code']; // Assign join code
    },
    // Method to emit 'courseSelected' event
    emitClickEvent() {
      // Emit 'courseSelected' event
      this.$emit('courseSelected');
    }
  },
  // Computed properties for the component
  computed: {
    // Mapping user store to computed properties
    ...mapStores(useUserStore)
  },
  // Lifecycle hook called when the component is created
  created() {
    // Determine if the user is a teacher
    this.isTeacher = this.userStore.user.role === 'teacher';
  }
};
</script>


<style scoped>
.hover\:shadow-glow:hover {
  box-shadow:
    0 0 5px,
    0 0 5px #cf0072,
    0 0 5px #cf0072,
    0 0 5px #cf0072;
}

.transparent-delete-button {
  background-color: transparent;
  border-color: transparent;
  height: 40px;
  width: 40px;
  font-size: 25px;
  color: white;
}

.transparent-delete-button:hover {
  background-color: lightcoral;
  color: white;
  border-color: transparent;
}
</style>
