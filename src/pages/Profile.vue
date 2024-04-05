<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import ProfileDetails from "@/components/ProfileDetails.vue";
</script>

<!-- profile page -->
<template>
  <div class="l-screen flex bg-gray-200 relative">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 relative h-full w-full overflow-auto">
      <!-- header and title -->
      <div class="bg-cover bg-no-repeat h-[30vh] mb-12 relative"
           style="background-image: url('https://www.utwente.nl/.uc/i6483d1530102352aaf00637dc00170c187b52a95d5e50701c3dc05000080/utimg13327.jpg');">
        <Header :title="pageTitle" class="text-gray-200 font-semibold"></Header>
        
        <!-- profile picture -->
        <div class="flex justify-center absolute inset-x-0 -bottom-5">
          <div class="w-32 h-32 md:w-48 md:h-48 lg:w-48 lg:h-48 relative">
            <img src="https://xsgames.co/randomusers/avatar.php?g=pixel" class="rounded-full border-4 border-gray-200 absolute object-cover w-full h-full" alt="Profile Picture">
          </div>
        </div>
      </div>
      <!-- profile details -->
      <ProfileDetails />
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
      pageTitle: 'My Profile',
      isEditing: false,
      userProfile: {
        name: 'Jane',
        surname: 'Doe',
        email: 'jane.doe@example.com'
      }
    }
  },
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing;
    },
    saveProfile() {
      // Here you can handle saving the profile data to a server or elsewhere
      this.toggleEdit(); // Turn off editing mode after saving
    }
  }
}
</script>

<!-- <style>
/* Additional CSS for grid layout */
.grid-cols-profileLayout {
  grid-template-columns: minmax(200px, 1fr) 3fr;
}
</style> -->