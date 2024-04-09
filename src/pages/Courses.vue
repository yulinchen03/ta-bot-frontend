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
        <div v-for="(row, rowIndex) in coursesRows" :key="rowIndex" class="flex justify-start">
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
        <el-form-item class="courses">
          <el-input v-model="courseForm.name" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer flex items-center justify-center">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button class="custom-button" @click="addCourse">
            Create
          </el-button>
        </div>
      </template>
    </el-dialog>


    <el-button v-if="isTeacher" size="large" @click="dialogFormVisible = true" circle class="fixed right-10 bottom-10 z-20">
      <el-icon class="mr-2"><Plus/></el-icon>
      Create a course
    </el-button>
  </div>
</template>


<script>
import PageHeader from '../components/Header.vue';
import courseService from "@/services/courseService.js";
import assignmentsService from "@/services/assignmentsService.js";
import {mapStores} from "pinia";
import useUserStore from "@/stores/user.js";
import {ElMessage} from "element-plus";
import userService from "@/services/userService";

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      pageTitle: 'My Courses',
      courses: [],
      isTeacher: null,
      courseForm: {
        name: '',
      },
      dialogFormVisible: false
    }
  },
  methods: {
    async addCourse() {
      try {
        const res = await courseService.addCourse({name: this.courseForm.name});
        const course = res.data.data;

        ElMessage({
          message: 'Course successfully created.',
          type: 'success',
        })
        this.dialogFormVisible = false
        this.courseForm.name = ''
        this.getCourses()
      } catch (err) {
        // TODO handle error
        console.log(err)

        ElMessage({
          message: err.message,
          type: 'fail',
        })
      }
    },
    async getCourses() {
      try {
        const res = await courseService.getCourses();
        const courses = res.data.data;
        this.courses = courses;
      } catch (err) {
        // TODO handle error
        console.log(err)
      }
    },
    openCourse(id) {
      this.$router.push({path: 'course', query: {id: id}});
    },
    async deleteCourse(id) {
      try {
        console.log(id)
        console.log('deleting course')
        await courseService.deleteCourse(id);
        this.courses = this.courses.filter(course => course.id !== id);
        ElMessage({
          message: 'Course successfully deleted.',
          type: 'success',
        })
      } catch (err) {
        // TODO handle error
        console.log(err)
        ElMessage({
          message: err.name,
          type: 'fail',
        })
      }
    },
    async deEnroll(id) {
      try {
        await userService.denrolCourse(id)
        ElMessage({
          message: 'Successfully de-enrolled from course.',
          type: 'success',
        })
      } catch (err) {
        console.log(err)
        ElMessage({
          message: err.name,
          type: 'fail',
        })
      }
    }
  },
  computed: {
    // Divide courses into rows (each row has 4 items)
    coursesRows() {
      const itemsPerRow = 4;
      const rows = [];
      for (let i = 0; i < this.courses.length; i += itemsPerRow) {
        rows.push(this.courses.slice(i, i + itemsPerRow));
      }
      return rows;
    },
    ...mapStores(useUserStore)
  },

  created() {
    this.getCourses()

    this.isTeacher = this.userStore.user.role === 'teacher';
  }
}
</script>

<style scoped>
.transparent-delete-button {
  background-color: transparent;
  border-color: transparent;
  height: 60px;
  width: 60px;
  font-size: 30px;
}

.transparent-delete-button:hover {
  background-color: lightcoral;
  color: white;
  border-color: transparent;
}
</style>