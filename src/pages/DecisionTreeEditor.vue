<script setup>

import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <Sidebar></Sidebar>
    <div class="flex justify-center items-center w-full h-full">
      <h1 class="text-2xl">Currently editing: Course {{this.courseid}}, Assignment {{(this.assignmentid+1)}}, Exercise {{(this.exerciseid+1)}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.fetchData();
    window.addEventListener('beforeunload', this.beforeUnload);
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.beforeUnload);
  },
  beforeRouteLeave(to, from, next) {
    // called when the route that renders this component is about to be navigated away from.
    // As with `beforeRouteUpdate`, it has access to `this` component instance.
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (!answer) return false
    next()
  },
  data() {
    return {
      courseid: -1,
      assignmentid: -1,
      exerciseid: -1,
      unsavedChanges: true,
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      this.courseid = Number(this.$route.query.c);
      this.assignmentid = Number(this.$route.query.a);
      this.exerciseid = Number(this.$route.query.e);
      // todo Query your database with courseId
    },
    beforeUnload(e) {
      if (this.unsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    },
  }
}
</script>