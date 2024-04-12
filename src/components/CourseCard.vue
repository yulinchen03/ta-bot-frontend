<template>
  <div class="w-full mx-3 box-border border border-1 align-middle rounded-3xl border-ut-light-gray flex flex-row justify-between p-3">
    <div class="flex flex-row w-fit align-middle">
<!--      NOTES TO YULIN: this needs to be with user.id, I imitate having a avatar with that-->
      <div v-if="!showEdit" class="text-lg w-fit h-fit">{{course.name}}</div>
      <input v-model="course.name" v-if="showEdit" placeholder="name" />
      <button v-if="showEdit" @click="editCourseAdmin(course.id, { name: course.name })">OK</button>

      <div class="text-lg text-ut-light-gray h-fit">{{course.instructor}}</div>

    </div>
    <div  class="text-lg text-ut-gold">{{course.access_id}}</div>

    <!-- TODO TO BE CHANGED OR REMOVED LATER AND CHANGED INTO THE POP UP-->
    <div class="flex flex-row gap-4">
      <button @click="this.$emit('deleteCourse')">Delete</button>
      <button @click="showEdit = !showEdit">Edit</button>
    </div>
    <!-- END -->
  </div>
</template>

<script>
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
    }
  }
}
</script>
