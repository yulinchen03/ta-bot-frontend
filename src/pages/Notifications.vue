<script setup>
import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';
</script>

<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <!--    sidebar -->
    <Sidebar></Sidebar>
    <!--  main -->
    <div class="grid grid-cols-1 relative h-screen w-screen overflow-y-auto">
      <PageHeader :title="pageTitle"></PageHeader>
      <div class="h-[calc(100vh-100px)] w-[calc(100vw-120px)]">
        <div v-for="(item, i) in notifications" :key="i">
          <div class="my-4 grid grid-cols-1 ml-10 bg-gray-300 rounded-lg shadow-lg overflow-y-auto">
            <div class="flex items-center">
              <div>
                <div class="flex items-center justify-start">
                  <img
                    :src="'https://xsgames.co/randomusers/avatar.php?g=pixel&' + item.id"
                    class="m-4 rounded-full w-[48px] h-[48px]"
                  />
                  <div class="grid grid-cols-1 text-sm">
                    <div class="flex">
                      <b>{{ item.from }}</b>
                      <el-badge v-if="!item.read" value="new" class="ml-2"></el-badge>
                    </div>
                    <i>{{ item.course }} > {{ item.assignment }} > {{ item.exercise }}</i>
                  </div>
                </div>
                <div class="mx-4 mb-4 text-sm">
                  <p>{{ item.content }}</p>
                </div>
              </div>
              <el-button
                v-if="!item.read"
                @click="toggleRead(item.id, true)"
                class="custom-button absolute right-10"
                >Mark as Read</el-button
              >
              <el-button
                v-if="item.read"
                @click="toggleRead(item.id, false)"
                class="custom-button absolute right-10"
                >Mark as Unread</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importing necessary dependencies and services
import PageHeader from '../components/Header.vue'; // Importing the PageHeader component
import feedbackService from '@/services/feedbackService.js'; // Service for feedback-related operations
import errorHandler from '@/utils/errorHandler.js'; // Utility function for error handling

export default {
  components: {
    PageHeader // Registering PageHeader as a component
  },
  // Data properties for the component
  data() {
    return {
      // Initializing data properties
      pageTitle: 'My Notifications', // Title of the page
      notifications: [] // Array to store notifications
    };
  },
  // Method called when the component is created
  created() {
    // Refresh notifications when the component is created
    this.refresh();
  },
  // Methods for the component
  methods: {
    // Method to toggle the read status of a notification
    async toggleRead(id, read) {
      try {
        // Call feedback service to toggle the read status
        await feedbackService.toggleFeedback(id, read);

        // Refresh notifications after toggling read status
        await this.refresh();
      } catch (err) {
        // Handle errors gracefully
        errorHandler(err);
      }
    },
    // Method to refresh notifications
    async refresh() {
      try {
        // Get feedback data from the feedback service
        const data = (await feedbackService.getFeedbackPerTeacher()).data.data;

        // Map feedback data to a more structured format
        const feedback = data.map((object) => ({
          id: object.id,
          from: object.student,
          exercise: object.exercise,
          course: object.course,
          assignment: object.assignment,
          content: object.content,
          read: object.is_read
        }));

        // Sort notifications based on read status
        feedback.sort((a, b) => a.read - b.read);

        // Update notifications array with sorted feedback
        this.notifications = feedback;
      } catch (err) {
        // Handle errors gracefully
        errorHandler(err);
      }
    }
  }
};
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
