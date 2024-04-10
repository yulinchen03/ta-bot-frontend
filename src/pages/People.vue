<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Itemcard from "@/components/Itemcard.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <!-- Sidebar -->
    <Sidebar></Sidebar>
    <!-- Main content -->
    <div class="grid grid-cols-1 relative h-screen w-screen">
      <Header :title="pageTitle"></Header>
      <div class="mx-20 overflow-y-auto w-[calc(100vw-200px)] h-[calc(100vh-100px)]">
        <!-- Dynamic rows -->
        <div v-if="isTeacher" v-for="(row, rowIndex) in coursesRows" :key="rowIndex" class="flex justify-start">
          <Itemcard
              v-for="item in row"
              :key="item.id"
              :courseData="item"
              class="w-[calc(25vw-100px)]"
              @courseSelected="openCourse(item.id)"
              @deleteCourse="deleteCourse(item.id)"
          />
        </div>
        <div v-else>
          <Itemcard
              v-for="course in courses"
              :key="course.id"
              :courseData="course"
              class="w-[calc(25vw-100px)]"
              @courseSelected="openCourse(course.id)"
              @deEnroll="deEnroll(course.id)"
          />
        </div>
      </div>
    </div>
    <el-dialog v-if="isTeacher" v-model="dialogFormVisible" title="Create Course" width="500">
      <el-form :model="courseForm">
        <el-form-item label="Course Name:" class="text-black">
          <el-input v-model="courseForm.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer flex items-center justify-center">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button class="custom-button" @click="addCourse">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>


    <el-button v-if="isTeacher" size="large" @click="dialogFormVisible = true" circle class="fixed right-10 bottom-10 z-20">
      <el-icon><Plus /></el-icon>
    </el-button>
  </div>
</template>


<script>
import PageHeader from '../components/Header.vue';
import courseService from "@/services/courseService.js";
import assignmentsService from "@/services/assignmentsService.js";
import { mapStores} from "pinia";
import useUserStore from "@/stores/user.js";
import {ElMessage} from "element-plus";
import userService from "@/services/userService";

export default {
  components: {
    PageHeader,
    Sidebar,
  },
  data() {
    return {
      pageTitle: 'My Courses',
    }
  },
  created() {
    console.log(this.userStore.user)
  }
}
</script>