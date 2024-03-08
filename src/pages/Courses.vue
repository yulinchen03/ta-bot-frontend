<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Itemcard from "@/components/Itemcard.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <!-- sidebar -->
    <Sidebar></Sidebar>
    <!--  main -->
    <div class="grid grid-cols-1 relative h-screen w-screen">
      <Header :title="pageTitle"></Header>
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
    </div>
  </div>
</template>

<script>
import PageHeader from '../components/Header.vue';

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      pageTitle: 'My Courses'
    }
  }
}
</script>