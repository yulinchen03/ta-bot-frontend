<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <!-- sidebar -->
    <Sidebar></Sidebar>
    <!--  main -->
    <div class="grid grid-cols-1 relative h-full w-full overflow-auto">
      <div class="relative grid grid-cols-1 overflow-visible bg-cover bg-no-repeat h-[25vh] w-full"
           style="background-image: url('https://cdn.rit.edu/images/program/2020-06/ai-banner.jpg');">
        <Header :title="pageTitle" class="text-gray-200 italic font-semibold"></Header>
        <div class="text-gray-200 xl:text-lg 2xl:text-2xl font-arial px-10 font-semibold">
          <h2>Instructor: {{ instructor }}</h2>
        </div>
        <div class="flex space-x-10 justify-between items-center text-gray-200 font-arial px-10 font-semibold xl:text-lg 2xl:text-2xl">
          <div class="flex space-x-10">
            <div class="text-center">
              <h2>Assignments: {{ assignmentCount }}</h2>
            </div>
            <div class="text-center">
              <h2>Total Questions: {{ questionCount }}</h2>
            </div>
            <div class="text-center">
              <h2>Unfinished Questions: {{ todo }}</h2>
            </div>
          </div>
          <el-button size="large" class="custom-button"><el-icon class="mr-2" :size="20"><Plus /></el-icon>Create Assignment</el-button>
        </div>
      </div>
      <div class="mx-10 py-5 h-[calc(100vh-150px)]">
        <div v-for="(item, i) in assignments" :key="i"
             class="bg-black border-ut-pink border-l-4 border-r-4 rounded-lg my-5 font-arial">
          <button @click="toggle(i)" class="w-full px-8 py-6 text-left">
            <h2 class="text-white font-semibold">{{ item.title }}</h2>
            <h2 class="text-white font-semibold absolute right-36">Questions: {{ item.questions.length }}</h2>
            <svg :class="{'transform rotate-180': activeIndex === i}" class="fill-ut-pink shrink-0 ml-8" width="16"
                 height="16" xmlns="http://www.w3.org/2000/svg">
              <rect y="7" width="16" height="2" rx="1"
                    class="transform origin-center transition duration-200 ease-out"/>
              <rect y="7" width="16" height="2" rx="1"
                    class="transform origin-center rotate-90 transition duration-200 ease-out"/>
            </svg>
          </button>
          <div v-show="activeIndex === i"
               class="bg-white px-8 py-6 grid grid-cols-1 relative h-full w-full overflow-auto">
            <el-table :data="item.questions">
              <el-table-column width="100" label="Complete">
                <template v-slot:default="scope">
                  <el-icon v-if="scope.row.completed" color="green" size="large">
                    <Check/>
                  </el-icon>
                  <el-icon v-else color="red" size="large">
                    <Close/>
                  </el-icon>
                </template>
              </el-table-column>
              <el-table-column width="600" prop="question" label="Question"></el-table-column>
              <el-table-column label="Open">
                <template v-slot:default="scope">
                  <el-button>
                    <el-icon class="mr-2">
                      <VideoPlay/>
                    </el-icon>
                    Start
                  </el-button>
                  <!--                    TODO GET THIS TO WORK-->
                </template>
              </el-table-column>
              <el-table-column prop="completed" label="Mark as Complete">
                <template v-slot:default="scope">
                  <el-checkbox v-model="scope.row" label="Complete" size="large" border/>
                  <!--                    TODO GET THIS TO WORK-->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  created() {
    this.fetchData();
  },
  data() {
    return {
      courseid: -1,
      pageTitle: '',
      instructor: '',
      assignmentCount: -1,
      questionCount: -1,
      todo: -1,
      activeIndex: null,
      assignments: [
        {
          title: 'Assignment 1',
          questions: [{question: 'Question 1', completed: false}, {
            question: 'Question 2',
            completed: false
          }, {question: 'Question 3', completed: false}]
        },
        {
          title: 'Assignment 2',
          questions: [{question: 'Question 1', completed: true}, {
            question: 'Question 2',
            completed: false
          }, {question: 'Question 3', completed: false}]
        },
        {
          title: 'Assignment 3',
          questions: [{question: 'Question 1', completed: true}, {
            question: 'Question 2',
            completed: true
          }, {question: 'Question 3', completed: false}]
        },
        {
          title: 'Assignment 4',
          questions: [{question: 'Question 1', completed: true}, {
            question: 'Question 2',
            completed: false
          }, {question: 'Question 3', completed: false},
            {question: 'Question 4', completed: true}]
        },]
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      this.courseid = this.$route.query.id;
      this.pageTitle = 'Service-Oriented Architecture Web Serv. (2023-2A)'
      this.instructor = 'Luis Ferreira Pires'
      this.assignmentCount = 4
      this.questionCount = 20
      this.todo = 17
      // Query your database with courseId
    },
    toggle(i) {
      this.activeIndex = this.activeIndex === i ? null : i;
    },
  },
}
</script>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";

</script>

<style scoped>
button {
  @apply flex justify-between items-center;
}

svg {
  @apply transition-transform duration-200;
}

.custom-button {
  background-color: #cf0072; /* This is for pink background */
  color: white; /* This is for white text */
  border-radius: 10px;
  font-weight: bold;
}

.custom-button:hover {
  background-color: white;
  color: black;
  border-color: #cf0072;
}

</style>