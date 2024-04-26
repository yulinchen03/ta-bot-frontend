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
import exercisesService from '@/services/exercisesService.js';
import { ElMessage } from 'element-plus';

export default {
  props: {
    coursename: String,
    assignmentname: String,
    exercisename: String,
    courseId: Number,
    assignmentId: Number,
    exerciseId: Number
  },
  mounted() {
    this.exercise = this.exercisename;
  },
  data() {
    return {
      exercise: '', // Initialize as needed
      editName: false
    };
  },
  methods: {
    async renameExercise() {
      try {
        await exercisesService.renameExercise(
          this.courseId,
          this.assignmentId,
          this.exerciseId,
          this.exercise
        );
        ElMessage({
          message: 'Successfully renamed exercise.',
          type: 'success'
        });
      } catch (err) {
        ElMessage({
          message: 'Could not rename exercise. (' + err.name + ')',
          type: 'fail'
        });
      }
      this.editName = !this.editName;
    },
    publishExercise() {
      this.$emit('publish');
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
