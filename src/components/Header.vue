<template>
  <div class="h-[100px] w-full flex justify-between items-center">
    <h1 class="text-3xl font-arial px-10 font-bold">{{ title }}</h1>
    <el-button @click="showJoin" v-if="!isTeacher" type="primary" class="mr-10 mt-4">Join Course</el-button>
  </div>
  <!-- POPUP -->
  <JoinCourse v-if="showJoinCourse" @courseCode="joinCourse" @cancel="cancelShowJoin"></JoinCourse>
</template>

<script>
import JoinCourse from "@/components/JoinCourse.vue";
import { mapStores } from "pinia";
import useUserStore from "@/stores/user.js";

export default {
  components: {
    JoinCourse
  },
  props: ['title'],
  data() {
    return {
      isTeacher: null,
      showJoinCourse: false
    }
  },
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
  computed: {
    ...mapStores(useUserStore)
  },
  created() {
    this.isTeacher = this.userStore.user.role === 'teacher';
  }
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