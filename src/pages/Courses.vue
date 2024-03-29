<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Itemcard from "@/components/Itemcard.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <!-- Sidebar -->
    <Sidebar></Sidebar>
    <!-- Main content -->
    <div class="grid grid-cols-1 relative h-screen w-screen">
      <Header :title="pageTitle"></Header>
      <div class="mx-20 overflow-y-auto w-[calc(100vw-200px)] h-[calc(100vh-100px)]">
        <!-- Dynamic rows -->
        <div v-for="(row, rowIndex) in coursesRows" :key="rowIndex" class="flex justify-start">
          <Itemcard
              v-for="item in row"
              :key="item.id"
              :course-data="item"
              class="w-[calc(25vw-100px)]"
              @courseSelected="openCourse(item.id)"
          />
        </div>
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
      pageTitle: 'My Courses',
      courses: [
        { id: 1, title: 'M1 Pearls of Computer Science (2023-1A)', code: '2023-202001048-2A', invite_code: 'AWA324' },
        { id: 2, title: 'M2 Software Systems (2023-1B)', code: '2023-202001048-2A', invite_code: 'AWA324' },
        { id: 3, title: 'M3 Network Systems (2023-2A)', code: '2023-202001048-2A', invite_code: 'AWA324' },
        { id: 4, title: 'M4 Data & Information (2023-2B)', code: '2023-202001048-2A', invite_code: 'AWA324' },
        { id: 5, title: 'M5 Computer Systems (2023-1A)', code: '2023-202001048-2A', invite_code: 'AWA324' },
        { id: 6, title: 'M6 Intelligent Interaction (2023-1B)', code: '2023-202001048-2A', invite_code: 'AWA324' },
        { id: 7, title: 'M7 Discrete Structures & Efficient Algorithms (2023-2A)', code: '2023-202001048-2A', invite_code: 'AWA324' },
        { id: 8, title: 'M8 Programming Paradigms (2023-2B)', code: '2023-202001048-2A', invite_code: 'AWA324' },
        { id: 9, title: 'M9 Minor I (2023-2A)', code: '2023-202001048-2A', invite_code: 'AWA324' },
        { id: 10, title: 'M10 Minor II (2023-2A)', code: '2023-202001048-2A', invite_code: 'AWA324' },
        { id: 11, title: 'M11 Design Project Module (2023-2A)', code: '2023-202001048-2A', invite_code: 'AWA324' },
        { id: 12, title: 'M12 Research Project Module (2023-2B)', code: '2023-202001048-2A', invite_code: 'AWA324' },
        // ... Add more data as needed
      ],
    }
  },
  methods: {
    getCourses() {
      // TODO get course data
    },
    openCourse(id) {
      this.$router.push({path: 'course', query: {id: id}});
    }
  },
  computed: {
    // Divide courses into rows (each row has 4 items)
    coursesRows() {
      const itemsPerRow = 4;
      const rows = [];
      for (let i = 0; i < this.courses.length; i += itemsPerRow) {
        rows.push(this.courses.slice(i, i + itemsPerRow));
      }
      return rows;
    },
  },
}
</script>