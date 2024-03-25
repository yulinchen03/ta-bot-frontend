<template>
  <div class="h-[100px] w-full flex justify-between items-center">
    <h1 class="text-3xl font-arial px-10 font-bold">{{ title }}</h1>
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