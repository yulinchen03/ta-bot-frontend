<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <!--    sidebar -->
    <Sidebar></Sidebar>
    <!--  main -->
    <div class="grid grid-cols-1 relative h-screen w-screen">
      <Header :title="pageTitle"></Header>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      pageTitle: 'My Dashboard',
      dialogVisible: false,
    }
  },
  methods: {
  }
}
</script>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
</script>