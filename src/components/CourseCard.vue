<template>
  <div @click="openCourse(course.id)" class="hover:cursor-pointer w-[85vw] mt-2 box-border border border-1 align-middle flex justify-between p-3 bg-white rounded-3xl shadow-md overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-102 hover:shadow-glow border-ut-pink">
    <div class="w-full items-center p-2 grid grid-cols-1">
      <div @click.stop class="w-fit h-fit flex">
        <b v-if="!showEdit" class="mr-4 text-lg">{{course.name}}</b>
        <el-form :inline="true" style="width: 25vw" v-if="showEdit">
          <el-form-item label="Course name" class="editUserFormItem" label-width="auto">
            <el-input @keydown="preventEnter" v-model="course.name" v-if="showEdit" placeholder="name" style="width: 20vw"/>
          </el-form-item>
        </el-form>
        <el-button class="custom-button " v-if="showEdit" @click.stop="editCourseAdmin(course.id, { name: course.name })">Save</el-button>
      </div>
      <div>
        <i class="text-md">Instructor: {{course.teacher}}</i>
        <div class="flex gap-2">
          <b class="text-md text-ut-gold">Access code: {{course.access_id}}</b>
          <el-button @click.stop="copy" round size="small" class="custom-button"><el-icon><DocumentCopy /></el-icon></el-button>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <el-button
          @keydown="onKeyDown"
          @click.stop="refresh"
          type="primary"
          text
      >Rename Course</el-button>
      <el-button
          @click.stop="this.$emit('deleteCourse')"
          type="danger"
          text

      >Delete Course</el-button>
    </div>
    <!-- END -->
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default
{
  props: ['course'],
  emits: ['deleteCourse', 'editCourseAdmin', 'refresh'],
  data() {
    return {
      showEdit: false,
    }
  },
  methods: {
    editCourseAdmin(id, course) {
      this.$emit('editCourseAdmin', id, course);
      this.showEdit = false;
    },
    copy() {
      navigator.clipboard.writeText(this.course.access_id);
      ElMessage({
        message: 'Access code copied to clipboard',
        type: 'success'
      })
    },
    openCourse(id) {
      this.$router.push({path: 'course', query: {id: id}});
    },
    preventEnter(event) {
      if (event.code === 'Enter') {
        event.preventDefault();
      }
    },
    onKeyDown(event) {
      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
      }
    },
    refresh() {
      if(this.showEdit){
        this.$emit('refresh')
      }
      this.showEdit = !this.showEdit
    },
  }
}
</script>

<style>
.custom-button {
background-color: #cf0072; /* This is for pink background */
color: white; /* This is for white text */
font-weight: bold;
border-color: #cf0072;
}

.custom-button:hover {
background-color: white;
color: black;
font-weight: bold;
border-color: #cf0072;
}

.editUserFormItem .el-form-item__label{
color:black;
font-weight: bold;
}
</style>
