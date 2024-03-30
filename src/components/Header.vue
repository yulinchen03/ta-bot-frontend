<template>
  <div class="h-[100px] w-full flex justify-between items-center">
    <h1 class="text-3xl font-arial px-10 font-bold">{{ title }}</h1>
    <el-button @click="showJoin" v-if="studentProfile" type="primary" class="mr-10 mt-4">Join Course</el-button>
  </div>
  <!-- POPUP -->
  <JoinCourse v-if="showJoinCourse" @courseCode="joinCourse" @cancel="cancelShowJoin"></JoinCourse>
</template>

<script>
import JoinCourse from './JoinCourse.vue'

export default {
  components: {
    JoinCourse
  },
  props: ['title', 'studentProfile'],
  methods: {
    showJoin() {
      this.showJoinCourse = true
    },
    joinCourse(courseCode) {
      console.log(courseCode)
      this.showJoinCourse = false
    },
    cancelShowJoin() {
      this.showJoinCourse = false
    }
  },
  data() {
    return {
      showJoinCourse: false
    }
  },
}
</script>

<style scoped>
.hover\:shadow-glow:hover {
  box-shadow: 0 0 5px , 0 0 5px #cf0072, 0 0 5px #cf0072, 0 0 5px #cf0072;
}
</style>