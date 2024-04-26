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
import { mapStores } from 'pinia';
import useUserStore from '@/stores/user.js';

export default {
  props: ['title'],
  data() {
    return {
      isTeacher: null,
      showJoinCourse: false
    };
  },
  methods: {
    showJoin() {
      this.$emit('showJoin');
    },
    close() {
      this.showJoinCourse = false;
    },
    isCoursesStudent() {
      if (this.userStore.user.role === 'student' && this.title === 'My Courses') {
        return true;
      }
      return false;
    }
  },
  computed: {
    ...mapStores(useUserStore)
  },
  created() {
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
