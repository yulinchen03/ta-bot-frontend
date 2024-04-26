<template>
  <div
    @click="openCourse(course.id)"
    class="h-fit hover:cursor-pointer w-[85vw] mt-2 box-border border border-1 align-middle flex justify-between p-3 bg-white rounded-3xl shadow-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-102 hover:shadow-glow border-ut-pink"
  >
    <div class="w-full h-fit items-center p-2 grid grid-cols-1">
      <div @click.stop class="w-fit h-fit flex">
        <b v-if="!showEdit" class="mr-4 text-lg">{{ course.name }}</b>
        <el-form :inline="true" style="width: 25vw" v-if="showEdit">
          <el-form-item label="Course name" class="editUserFormItem" label-width="auto">
            <el-input
              @keydown="preventEnter"
              v-model="course.name"
              v-if="showEdit"
              placeholder="name"
              style="width: 20vw"
            />
          </el-form-item>
        </el-form>
        <el-button
          class="custom-button"
          v-if="showEdit"
          @click.stop="editCourseAdmin(course.id, { name: course.name })"
          >Save</el-button
        >
      </div>
      <div>
        <i class="text-md">Instructor: {{ course.teacher }}</i>
        <div class="flex gap-2">
          <b class="text-md text-ut-gold">Access code: {{ course.access_id }}</b>
          <el-button @click.stop="copy" round size="small" class="custom-button"
            ><el-icon><DocumentCopy /></el-icon
          ></el-button>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <el-button @keydown="onKeyDown" @click.stop="refresh" type="primary" text
        >Rename Course</el-button
      >
      <el-button @click.stop="this.$emit('deleteCourse')" type="danger" text
        >Delete Course</el-button
      >
    </div>
    <!-- END -->
  </div>
</template>

<script>
// Importing necessary library
import { ElMessage } from 'element-plus';

export default {
  // Props received by the component
  props: ['course'],
  // Events emitted by the component
  emits: ['deleteCourse', 'editCourseAdmin', 'refresh'],
  // Data properties for the component
  data() {
    return {
      showEdit: false // Flag to control edit mode for the course
    };
  },
  // Methods for the component
  methods: {
    // Method to trigger editing of the course by emitting 'editCourseAdmin' event
    editCourseAdmin(id, course) {
      this.$emit('editCourseAdmin', id, course); // Emitting 'editCourseAdmin' event to parent component
      this.showEdit = false; // Turning off edit mode after emitting the event
    },
    // Method to copy access code to clipboard
    copy() {
      // Using navigator clipboard API to copy access code to clipboard
      navigator.clipboard.writeText(this.course.access_id);
      // Showing success message after copying access code
      ElMessage({
        message: 'Access code copied to clipboard',
        type: 'success'
      });
    },
    // Method to open course by navigating to its route
    openCourse(id) {
      // Redirecting to the route of the selected course
      this.$router.push({ path: 'course', query: { id: id } });
    },
    // Method to prevent default action on Enter key press
    preventEnter(event) {
      if (event.code === 'Enter') {
        event.preventDefault();
      }
    },
    // Method to prevent default action on Space and Enter key press
    onKeyDown(event) {
      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
      }
    },
    // Method to refresh the component
    refresh() {
      // Emitting 'refresh' event if edit mode is enabled
      if (this.showEdit) {
        this.$emit('refresh');
      }
      // Toggling edit mode
      this.showEdit = !this.showEdit;
    }
  }
};
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

.editUserFormItem .el-form-item__label {
  color: black;
  font-weight: bold;
}
</style>
