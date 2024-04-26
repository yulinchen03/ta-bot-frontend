<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <!-- Sidebar -->
    <Sidebar></Sidebar>
    <!-- Main content -->
    <div class="grid grid-cols-1 relative h-screen w-screen overflow-x-clip">
      <Header :title="pageTitle"></Header>
      <div class="mx-10 w-[calc(100vw-120px)] h-[calc(100vh-100px)] flex flex-col gap-3">
        <!-- Search Bar -->
        <el-input
          class="p-2 rounded-lg"
          type="text"
          v-model="searchQuery"
          placeholder="Search by name, email, or role"
          style="width: 85vw"
        />
        <!-- List of Person Cards -->
        <div class="overflow-y-scroll flex flex-col gap-3 mb-2">
          <PersonCard
            @editUserAdmin="editUserAdmin"
            @switchRole="switchRole(user.id, user.role)"
            @deleteUser="deleteUser(user.id)"
            @refresh="refresh"
            v-for="user in filteredUsers"
            :user="user"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importing necessary components, services, and utilities
import Header from '@/components/Header.vue'; // Header component
import Sidebar from '@/components/Sidebar.vue'; // Sidebar component
import { mapStores } from 'pinia'; // Pinia for state management
import useUserStore from '@/stores/user.js'; // Store for user-related data
import PersonCard from '@/components/PersonCard.vue'; // PersonCard component for displaying user information
import userService from '@/services/userService.js'; // Service for user-related operations
import { ElMessage } from 'element-plus'; // Element Plus for displaying messages
import errorHandler from '@/utils/errorHandler.js'; // Utility function for error handling

export default {
  components: {
    PersonCard, // Registering PersonCard component
    Header, // Registering Header component
    Sidebar // Registering Sidebar component
  },
  // Data properties for the component
  data() {
    return {
      // Initializing data properties
      pageTitle: 'User Management', // Title of the page
      searchQuery: '', // Search query for filtering users
      users: [] // Array to store users
    };
  },
  // Computed properties for the component
  computed: {
    ...mapStores(useUserStore), // Mapping user store as a computed property
    // Computed property to filter users based on search query
    filteredUsers() {
      const query = this.searchQuery.toLowerCase(); // Convert search query to lowercase
      // Filter users based on name, email, or role matching the search query
      return this.users.filter((user) => {
        return (
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.role.toLowerCase().includes(query)
        );
      });
    }
  },
  // Method called when the component is created
  created() {
    // Refresh users when the component is created
    this.refresh();
  },
  // Methods for the component
  methods: {
    // Method to refresh the list of users
    async refresh() {
      try {
        // Get users data from the user service
        const res = (await userService.getUsers()).data.data;
        // Update users array with fetched data
        this.users = res;
      } catch (err) {
        // Handle errors gracefully
        errorHandler(err);
      }
    },
    // Method to delete a user
    async deleteUser(userId) {
      try {
        // Call user service to delete the user
        await userService.deleteUser(userId);
        // Refresh users after deletion
        this.refresh();
        // Display success message
        ElMessage({
          showClose: true,
          message: 'User deleted successfully',
          type: 'success'
        });
      } catch (err) {
        // Handle errors gracefully
        errorHandler(err);
      }
    },
    // Method to switch the role of a user
    async switchRole(userId, role) {
      try {
        // Determine the role to switch to
        let changeTo = null;
        if (role === 'teacher') changeTo = 'student';
        else changeTo = 'teacher';
        // Call user service to switch the user role
        await userService.switchRole(userId, changeTo);
        // Display success message
        ElMessage({
          showClose: true,
          message: `User role changed to ${changeTo} successfully`,
          type: 'success'
        });
        // Refresh users after role change
        this.refresh();
      } catch (err) {
        // Handle errors gracefully
        errorHandler(err);
      }
    },
    // Method to edit a user's information by admin
    async editUserAdmin(userId, body) {
      try {
        // Extract relevant data from the request body
        const { name, surname, email } = body;
        // Call user service to edit the user's information
        await userService.editUser(userId, { name, surname, email });
        // Refresh users after editing
        this.refresh();
        // Display success message
        ElMessage({
          showClose: true,
          message: 'User edited successfully',
          type: 'success'
        });
      } catch (err) {
        // Handle errors gracefully
        errorHandler(err);
        // Refresh users after error
        this.refresh();
      }
    }
  }
};
</script>

