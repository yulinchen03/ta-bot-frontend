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
                  <img :src="item.imgurl"
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
              <el-button v-if="!item.read" @click="toggleRead(i)" class="custom-button absolute right-10">Mark as Read</el-button>
              <el-button v-if="item.read" @click="toggleRead(i)" class="custom-button absolute right-10">Mark as Unread</el-button>
            </div>
          </div>
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
      pageTitle: 'My Notifications',
      notifications: [
        {
          from: 'D. Krylov',
          imgurl: 'https://media.licdn.com/dms/image/D4E03AQFiKwwtju2pkw/profile-displayphoto-shrink_400_400/0/1702248046452?e=1717027200&v=beta&t=8cURgcpoCuKkygn3gJqfxxj31bJlB4JhjSXC6kQs_Uw',
          exercise: 'Exercise 2 - Assignment 4 - M8 Programming Paradigms (2023-2B)',
          content: 'Yapping is all about making the obvious sound so sophisticated that people actually think you know what you are talking about.',
          read: false
        },
        {
          from: 'S. Akin',
          imgurl: 'https://media.licdn.com/dms/image/D4E35AQFjsKZe5NFPrg/profile-framedphoto-shrink_400_400/0/1651415418695?e=1712170800&v=beta&t=fBj75YibCbLapt56W3VaMZfacGISU7A1kcmqE4S2WHg',
          exercise: 'Exercise 6 - Assignment 1 - M5 Computer Systems (2023-1A)\n',
          content: 'The nature of git is actually quite philosophical. Think about it.',
          read: false
        },
        {
          from: 'S. Asif',
          imgurl: 'https://media.licdn.com/dms/image/D4E03AQEzaJiMrM7bfQ/profile-displayphoto-shrink_400_400/0/1696446050831?e=1717027200&v=beta&t=Qra6LC7LdHrF0ES2tq266Rvm0-rfHeX8STuxbN7X0Kw',
          exercise: 'Exercise 4 - Assignment 7 - M6 Intelligent Interaction (2023-1B)',
          content: 'Nothing about this course makes sense. The feedback is vague and does not help me with any of the exercises meaningfully.',
          read: true
        }],
    }
  },
  methods: {
    toggleRead(id) {
      this.notifications[id].read = !this.notifications[id].read
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