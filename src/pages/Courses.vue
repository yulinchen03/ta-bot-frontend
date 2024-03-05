<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Itemcard from "@/components/Itemcard.vue";
</script>

<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <!-- sidebar -->
    <Sidebar></Sidebar>
    <!--  main -->
    <div class="grid grid-cols-1 grid-rows-16 relative h-screen">
      <div class="h-[100px]">
        <h1 class="text-3xl font-arial px-10 font-bold mt-10">Courses</h1>
      </div>
      <div class="mx-10 h-[calc(100vh-150px)]">
        <el-row :gutter="20">
          <el-col :span="6">
            <Itemcard></Itemcard>
          </el-col>
          <el-col :span="6">
            <Itemcard></Itemcard>
          </el-col>
          <el-col :span="6">
            <Itemcard></Itemcard>
          </el-col>
          <el-col :span="6">
            <Itemcard></Itemcard>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <Itemcard></Itemcard>
          </el-col>
          <el-col :span="6">
            <Itemcard></Itemcard>
          </el-col>
          <el-col :span="6">
            <Itemcard></Itemcard>
          </el-col>
          <el-col :span="6">
            <Itemcard></Itemcard>
          </el-col>
        </el-row>
      </div>
      <div class="bg-ut-pink items-center justify-center flex text-ut-white font-arial font-bold h-[50px]">
        <h3>WORK IN PROGRESS...</h3>
      </div>
    </div>
  </div>
</template>