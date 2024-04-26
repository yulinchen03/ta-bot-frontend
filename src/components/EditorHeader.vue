<template>
  <div class="w-full flex items-center p-1">
    <div class="w-[25vw] p-5">
      <el-button @click="$emit('goBack')" class="custom-button">
        <el-icon class="mr-2"><Back /></el-icon>
        Back
      </el-button>
    </div>
    <div class="grid grid-cols-1 w-[50vw]">
      <div class="flex justify-center items-center p-2 gap-2">
        <b class="text-sm">{{ coursename }}</b>
        <i class="text-sm">{{ assignmentname }}</i>
      </div>
      <div class="flex justify-center items-center mx-20">
        <el-input
          :disabled="!editName"
          v-model="exercise"
          :placeholder="exercisename"
          style="width: 40vw"
          class="mr-3"
        />
        <el-button v-if="!editName" @click="editName = !editName" class="custom-button"
          >Edit</el-button
        >
        <el-button v-if="editName" @click="renameExercise" class="custom-button">Rename</el-button>
      </div>
    </div>
    <div class="flex justify-end w-[25vw] p-5">
      <el-button @click="publishExercise" class="transparent-button">
        <el-icon class="mr-2"><Promotion /></el-icon>
        Publish
      </el-button>
    </div>
  </div>
</template>

<script>
// Importing necessary libraries and components
import exercisesService from '@/services/exercisesService.js'; // Importing exercises service for exercise-related operations
import { ElMessage } from 'element-plus'; // Importing ElMessage component from element-plus for displaying messages

export default {
  // Props received by the component
  props: {
    // Defining props with their respective types
    coursename: String,
    assignmentname: String,
    exercisename: String,
    courseId: Number,
    assignmentId: Number,
    exerciseId: Number
  },
  // Lifecycle hook called when the component is mounted
  mounted() {
    this.exercise = this.exercisename; // Initializing 'exercise' data property with 'exercisename' prop value
  },
  // Data properties for the component
  data() {
    return {
      // Initializing data properties
      exercise: '', // Current exercise name
      editName: false // Flag to control edit mode for exercise name
    };
  },
  // Methods for the component
  methods: {
    // Method to rename the exercise
    async renameExercise() {
      try {
        // Calling exercises service to rename the exercise
        await exercisesService.renameExercise(
            this.courseId,
            this.assignmentId,
            this.exerciseId,
            this.exercise
        );
        // Showing success message if exercise is renamed successfully
        ElMessage({
          message: 'Successfully renamed exercise.',
          type: 'success'
        });
      } catch (err) {
        // Showing error message if exercise renaming fails
        ElMessage({
          message: 'Could not rename exercise. (' + err.name + ')',
          type: 'fail'
        });
      }
      this.editName = !this.editName; // Toggling edit mode for exercise name
    },
    // Method to emit 'publish' event
    publishExercise() {
      this.$emit('publish'); // Emitting 'publish' event to parent component
    }
  }
};
</script>


<style>
.custom-button {
  background-color: #cf0072; /* This is for pink background */
  color: white; /* This is for white text */
  font-weight: bold;
}

.custom-button:hover {
  background-color: white;
  color: black;
  border-color: #cf0072;
}

.transparent-button {
  background-color: transparent;
  color: #2a9d8f;
  border-color: #2a9d8f;
  border-radius: 10px;
  width: 7vw;
  font-weight: bold;
}

.transparent-button:hover {
  background-color: #2a9d8f;
  color: white;
  border-color: #2a9d8f;
  font-weight: bold;
}
</style>
