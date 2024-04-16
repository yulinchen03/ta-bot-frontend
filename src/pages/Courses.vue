<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <JoinCourse @join="joinCourse" @close="close" v-if="showJoinCourse"></JoinCourse>

    <!-- Sidebar -->
    <Sidebar></Sidebar>
    <!-- Main content -->
    <div class="grid grid-cols-1 relative h-screen w-screen">
      <Header @showJoin="showJoinCourse=true" :title="pageTitle"></Header>
      <div class="mx-20 overflow-y-auto w-[calc(100vw-200px)] h-[calc(100vh-100px)]">
        <!-- Dynamic rows -->
        <div v-if="isTeacher" v-for="(row, rowIndexTeacher) in coursesRows" :key="rowIndexTeacher" class="flex justify-start">
          <Itemcard
              v-for="item in row"
              :key="item.id"
              :courseData="item"
              class="w-[calc(25vw-100px)]"
              @courseSelected="openCourse(item.id)"
              @deleteCourse="deleteCourse(item.id)"
          />
        </div>
        <div v-else v-for="(row, rowIndexStudent) in coursesRows" :key="rowIndexStudent" class="flex justify-start">
          <Itemcard
              v-for="item in row"
              :key="item.id"
              :courseData="item"
              class="w-[calc(25vw-100px)]"
              @courseSelected="openCourse(item.id)"
              @deEnroll="deEnroll(item.access_id)"
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


    <el-button v-if="isTeacher" size="large" @click="dialogFormVisible = true" round class="fixed right-10 bottom-10 z-20 custom-button">
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
import Sidebar from "@/components/Sidebar.vue";
import Itemcard from "@/components/Itemcard.vue";
import Header from "@/components/Header.vue";
import JoinCourse from "@/components/JoinCourse.vue";
import errorHandler from "@/utils/errorHandler.js";

export default {
  components: {
    PageHeader,
    JoinCourse,
    Header,
    Sidebar,
    Itemcard,

  },
  data() {
    return {
      pageTitle: 'My Courses',
      courses: [],
      isTeacher: null,
      courseForm: {
        name: '',
      },
      dialogFormVisible: false,
      showJoinCourse: false
    }
  },
  methods: {
    async addCourse() {
      try {
        await courseService.addCourse({name: this.courseForm.name});
        await this.getCourses()
        ElMessage({
          message: 'Course successfully created.',
          type: 'success',
        })
        this.dialogFormVisible = false
        this.courseForm.name = ''
      } catch (err) {
        errorHandler(err)
      }
    },
    async joinCourse(courseCode) {
        try {
          console.log('Joining course...')
          const response = await userService.joinCourse(courseCode);
          ElMessage({
            message: 'Course joined successfully',
            type: 'success'

          })
          await this.getCourses()
        }
        catch (err) {
          errorHandler(err)
        }
        this.showJoinCourse = false
    },
    async getCourses() {
      try {
        console.log('fetching course...')
        const res = await courseService.getCourses();
        this.courses = res.data.data;
      } catch (err) {
        errorHandler(err)
      }
    },
    openCourse(id) {
      this.$router.push({path: 'course', query: {id: id}});
    },
    async deleteCourse(id) {
      try {
        await courseService.deleteCourse(id);
        this.courses = this.courses.filter(course => course.id !== id);
        ElMessage({
          message: 'Course successfully deleted.',
          type: 'success',
        })
      } catch (err) {
        errorHandler(err)
      }
    },
    async deEnroll(id) {
      try {
        await userService.denrolCourse(id)
        ElMessage({
          message: 'Successfully de-enrolled from course.',
          type: 'success',
        })
        this.getCourses()
      } catch (err) {
        errorHandler(err)
        this.getCourses()
      }
    },
    showJoin() {
      this.showJoinCourse = true
    },
    close() {
      console.log('closing')
      this.showJoinCourse = false
    },
    test(){
      console.log('join course')
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
    console.log(this.userStore.user)
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

.custom-button {
  background-color: #cf0072; /* This is for pink background */
  color: white; /* This is for white text */
  font-weight: bold;
  border-color: #cf0072;
}
</style>