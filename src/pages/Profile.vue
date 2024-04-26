<script setup>
import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';
import ProfileDetails from '@/components/ProfileDetails.vue';
</script>

<!-- profile page -->
<template>
  <div class="l-screen flex bg-gray-200 relative">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 relative h-full w-full overflow-auto">
      <!-- header and title -->
      <div
        class="bg-cover bg-no-repeat h-[30vh] mb-12 relative"
        style="
          background-image: url('https://www.utwente.nl/.uc/i6483d1530102352aaf00637dc00170c187b52a95d5e50701c3dc05000080/utimg13327.jpg');
        "
      >
        <Header :title="pageTitle" class="text-gray-200 font-semibold"></Header>

        <!-- profile picture -->
        <div class="flex justify-center absolute inset-x-0 -bottom-5">
          <div class="w-32 h-32 md:w-48 md:h-48 lg:w-48 lg:h-48 relative">
            <img
              :src="'https://xsgames.co/randomusers/avatar.php?g=pixel&' + userDetails.id"
              class="rounded-full border-4 border-gray-200 absolute object-cover w-full h-full"
              alt="Profile Picture"
            />
          </div>
        </div>
      </div>
      <!-- profile details -->
      <ProfileDetails :userDetails="userDetails" @refresh="refresh" />
    </div>
  </div>
</template>

<script>
// Importing necessary components and services
import PageHeader from '../components/Header.vue'; // Importing the PageHeader component
import authService from '@/services/authService.js'; // Service for authentication
import errorHandler from '@/utils/errorHandler.js'; // Utility function for error handling

export default {
  components: {
    PageHeader // Registering PageHeader as a component
  },
  // Data properties for the component
  data() {
    return {
      // Initializing data properties
      pageTitle: 'My Profile', // Title of the page
      isEditing: false, // Flag to indicate if profile is being edited
      userDetails: { // Object to store user details
        id: '', // User ID
        name: '', // User's first name
        surname: '', // User's last name
        email: '' // User's email address
      }
    };
  },
  // Methods for the component
  methods: {
    // Method to toggle editing mode
    toggleEdit() {
      this.isEditing = !this.isEditing; // Toggle the value of isEditing
    },
    // Method to save profile changes
    saveProfile() {
      // Here you can handle saving the profile data to a server or elsewhere
      this.toggleEdit(); // Turn off editing mode after saving
    },
    // Method to refresh user details
    async refresh() {
      try {
        // Get current user data from the authentication service
        const user = (await authService.getCurrentUser()).data;
        // Update userDetails with fetched user data
        this.userDetails = {
          id: user.id, // User ID
          name: user.name, // User's first name
          surname: user.surname, // User's last name
          email: user.email // User's email address
        };
      } catch (err) {
        // Handle errors gracefully
        errorHandler(err);
      }
    }
  }
};
</script>

