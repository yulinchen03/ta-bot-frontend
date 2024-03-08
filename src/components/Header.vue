<template>
  <div class="h-[100px] w-full flex flex-row items-center">
    <h1 class="text-3xl font-arial px-10 font-bold basis-11/12">{{ title }}</h1>
    <div class="basis-1/12">
      <el-button @click="open1" :type="'info'" circle :size="'large'" class="hover:scale-101 hover:shadow-glow border-ut-pink"><el-icon :size=24><Bell /></el-icon></el-button>
    </div>
  </div>
  <div class="bg-ut-pink items-center justify-center flex text-ut-white font-arial font-bold h-[50px] absolute inset-x-0 bottom-0">
    <h3>WORK IN PROGRESS...</h3>
  </div>
</template>

<script>
export default {
  props: ['title'],
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
</script>

<style scoped>
.hover\:shadow-glow:hover {
  box-shadow: 0 0 5px , 0 0 5px #cf0072, 0 0 5px #cf0072, 0 0 5px #cf0072;
}
</style>