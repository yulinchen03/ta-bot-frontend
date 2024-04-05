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
    exercise: 'Success',
    message: 'This is a success message',
    type: 'success',
  })
}
</script>