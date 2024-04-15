<template>
  <div class="w-[85vw] box-border border border-1 align-middle rounded-3xl border-ut-light-gray flex justify-between p-3">
    <div class="w-full items-center p-2 grid grid-cols-1">
      <div class="w-fit h-fit flex">
        <b v-if="!showEdit" class="mr-4 text-lg">{{course.name}}</b>
        <el-form :inline="true" style="width: 25vw" v-if="showEdit">
          <el-form-item label="Course name" class="editUserFormItem" label-width="auto">
            <el-input v-model="course.name" v-if="showEdit" placeholder="name" style="width: 20vw"/>
          </el-form-item>
        </el-form>
        <el-button class="custom-button" v-if="showEdit" @click="editCourseAdmin(course.id, { name: course.name })">Save</el-button>
      </div>
      <div>
        <i class="text-md">Instructor: {{course.teacher}}</i>
        <div class="flex gap-2">
          <b class="text-md text-ut-gold">Access code: {{course.access_id}}</b>
          <el-button @click="copy" round size="small" class="custom-button"><el-icon><DocumentCopy /></el-icon></el-button>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <el-button
          @click="showEdit = !showEdit"
          type="primary"
          text
      >Rename Course</el-button>
      <el-button
          @click="this.$emit('deleteCourse')"
          type="danger"
          text
      >Delete Course</el-button>
    </div>
    <!-- END -->
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  props: ['course'],
  emits: ['deleteCourse', 'editCourseAdmin'],
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
