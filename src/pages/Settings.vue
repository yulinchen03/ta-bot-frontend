<script setup>
import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';
</script>

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
import PageHeader from '../components/Header.vue';

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      pageTitle: 'Settings'
    };
  }
};
</script>
