<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <!--    sidebar -->
    <Sidebar></Sidebar>
    <!--  main -->
    <div class="grid grid-cols-1 relative h-screen w-screen overflow-y-auto">
      <Header :title="pageTitle"></Header>
      <div class="h-[calc(100vh-100px)] w-[calc(100vw-120px)]">
        <div v-for="(item, i) in notifications" :key="i">
          <div class="my-4 grid grid-cols-1 ml-10 bg-gray-300 rounded-lg shadow-lg overflow-y-auto">
            <div class="flex items-center">
              <div>
                <div class="flex items-center justify-start">
                  <img :src="'https://xsgames.co/randomusers/avatar.php?g=pixel&' + Math.floor(Math.random() * 50) + 1"
                      class="m-4 rounded-full w-[48px] h-[48px]">
                  <div class="grid grid-cols-1 text-sm">
                    <div class="flex">
                      <b>{{ item.from }}</b>
                      <el-badge v-if="!item.read" value="new" class="ml-2"></el-badge>
                    </div>
                    <i>{{ item.exercise }}</i>
                  </div>
                </div>
                <div class="mx-4 mb-4 text-sm"><p>{{ item.content }}</p></div>
              </div>
              <el-button v-if="!item.read" @click="toggleRead(item.id, true)" class="custom-button absolute right-10">Mark as Read</el-button>
              <el-button v-if="item.read" @click="toggleRead(item.id, false)" class="custom-button absolute right-10">Mark as Unread</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '../components/Header.vue';
import {ElMessage} from "element-plus";
import feedbackService from "@/services/feedbackService.js";
export default {
  components: {
    PageHeader
  },
  data() {
    return {
      pageTitle: 'My Notifications',
      notifications: [],
    }
  },
  created() {
    this.refresh()
    },
  methods: {
    async toggleRead(id, read) {
      try {
        console.log(id)
        await feedbackService.toggleFeedback(id, read)


        await this.refresh()

      } catch (err) {
        console.log(err)
        ElMessage({
          message: err.message,
          type: 'fail',
        })
      }
    },
    async refresh() {
      try {
        const data = (await feedbackService.getFeedbackPerTeacher()).data.data

        console.log(data)


        const feedback = data.map(object => ({
          id: object.id,
          from: object.student,
          exercise: object.exercise.identifier,
          content: object.content,
          read: object.is_read
        }));

        feedback.sort((a, b) => a.read - b.read);

        // console.log(feedback)

        this.notifications = feedback



      }
      catch (err) {
        ElMessage({
          message: err.message,
          type: 'fail',
        })
      }
    }
  }
}
</script>

<style>
.custom-button {
  background-color: #cf0072; /* This is for pink background */
  color: white; /* This is for white text */
  font-weight: bold;
}

.custom-button:hover {
  background-color: white;
  color: black;
  border-color: #cf0072;
}
</style>