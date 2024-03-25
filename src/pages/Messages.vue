<script setup>
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <!--    sidebar -->
    <Sidebar></Sidebar>
    <!--  main -->
    <div class="grid grid-cols-1 relative h-full w-full overflow-auto">
      <div class="h-[100px] w-full flex items-center">
        <h1 class="text-3xl font-arial px-10 font-bold">Messages</h1>
      </div>
      <el-table></el-table>
    </div>
  </div>
</template>