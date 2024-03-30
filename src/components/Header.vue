<template>
  <div class="h-[100px] w-full flex justify-between items-center">
    <h1 class="text-3xl font-arial px-10 font-bold">{{ title }}</h1>
    <el-button @click="joinCourse" v-if="studentProfile" type="primary" class="mr-10 mt-4">Join Course</el-button>
  </div>
  <!-- popup asking for course code to join-->
  <el-dialog
      v-if="join"
      title="Join Course"
      :visible.sync="dialogVisible"
      width="30%"
      center
  ></el-dialog>
</template>

<script>
export default {
  props: ['title', 'studentProfile'],
  methods: {}
}
</script>

<script setup>
import { ElNotification } from 'element-plus'


const open1 = () => {
  ElNotification({
    title: 'Success',
    message: 'This is a success message',
    type: 'success',
  })
}
methods: {
  joinCourse(){

  }
}
</script>

<style scoped>
.hover\:shadow-glow:hover {
  box-shadow: 0 0 5px , 0 0 5px #cf0072, 0 0 5px #cf0072, 0 0 5px #cf0072;
}
</style>