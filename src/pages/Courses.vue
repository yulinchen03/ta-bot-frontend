<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Card from "@/components/Itemcard.vue";
import Itemcard from "@/components/Itemcard.vue";
</script>

<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <!--    sidebar -->
    <Sidebar></Sidebar>
    <!--  main -->
    <div class="grid grid-cols-1 grid-rows-16 w-full relative">
      <div>
        <h1 class="text-3xl font-arial px-10 font-bold mt-10">Courses</h1>
      </div>
      <div class="mx-10 row-span-10">
        <el-row class="my-10" :gutter="20">
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
        <el-row class="my-10" :gutter="20">
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
      <div class="row-span-4 bg-ut-pink items-center justify-center flex text-ut-white font-arial font-bold">
        <h3>WORK IN PROGRESS...</h3>
      </div>
    </div>
  </div>
</template>