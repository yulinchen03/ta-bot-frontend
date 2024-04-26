<template>
  <div class="flex justify-center">
    <div class="px-5 py-2 bg-gray-200 mt-5 m:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 mx-auto">
      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <label for="name" class="block text-black text-lg font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            v-model="userDetails.name"
            :class="{ 'bg-gray-200': !isEditing, 'bg-white': isEditing }"
            class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-200"
            :disabled="!isEditing"
          />
        </div>
        <div class="mb-4">
          <label for="surname" class="block text-black text-lg font-bold mb-2">Surname</label>
          <input
            type="text"
            id="surname"
            v-model="userDetails.surname"
            :class="{ 'bg-gray-200': !isEditing, 'bg-white': isEditing }"
            class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-200"
            :disabled="!isEditing"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-black text-lg font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="userDetails.email"
            :class="{ 'bg-gray-200': !isEditing, 'bg-white': isEditing }"
            class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-200"
            :disabled="!isEditing"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            v-if="!isEditing"
            class="w-20 bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="edit"
          >
            Edit
          </button>
          <button
            v-else
            class="w-20 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="saveEdit"
          >
            Save
          </button>
          <button
            class="w-35 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="onNewPassword"
          >
            New Password
          </button>
          <button
            class="w-20 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="onDelete"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  </div>
  <NewPassword v-if="isNewPassword" @cancel="isNewPassword = false" @newPass="handleNewPassword" />

  <ProfilePopUp v-if="updating" :type="update" @cancel="cancelUpdate" @update="updateDetails" />
  <ProfilePopUp v-if="isDelete" :type="del" @cancel="cancelDelete" @delete="deleteAccount" />
</template>

<script>
// Importing necessary components and services
import ProfilePopUp from '@/components/ProfilePopUp.vue'; // Component for profile popup
import NewPassword from '@/components/NewPassword.vue'; // Component for new password
import { mapStores } from 'pinia'; // Pinia for state management
import useUserStore from '@/stores/user.js'; // Store for user-related data
import authService from '@/services/authService.js'; // Service for authentication
import { ElMessage } from 'element-plus'; // Element Plus for displaying messages
import errorHandler from '@/utils/errorHandler.js'; // Utility function for error handling

export default {
  // Registering components used in the template
  components: {
    NewPassword,
    ProfilePopUp
  },
  // Component name
  name: 'UserDetails',
  // Props received by the component
  props: ['userDetails'],
  // Events emitted by the component
  emits: ['refresh'],
  // Data properties for the component
  data() {
    return {
      // Initializing data properties
      del: 'delete', // Placeholder for 'delete' string
      updating: false, // Flag to indicate if details are being updated
      isEditing: false, // Flag to indicate if user details are being edited
      isDelete: false, // Flag to indicate if deletion action is initiated
      isNewPassword: false // Flag to indicate if new password action is initiated
    };
  },
  // Methods for the component
  methods: {
    // Method to initiate editing of user details
    edit() {
      this.isEditing = true; // Set isEditing flag to true
    },
    // Method to save edited user details
    saveEdit() {
      // Validate if all fields are filled
      if (
          this.userDetails.name === '' ||
          this.userDetails.surname === '' ||
          this.userDetails.email === ''
      ) {
        // If any field is empty, show error message
        ElMessage({
          type: 'error',
          message: 'Please fill in all fields'
        });
        return;
      }
      // Set updating flag to true to indicate details are being updated
      this.updating = true;
    },
    // Method to cancel ongoing update of user details
    cancelUpdate() {
      // Reset updating and isEditing flags
      this.updating = false;
      this.isEditing = false;
    },
    // Method to initiate deletion of user account
    onDelete() {
      this.isDelete = true; // Set isDelete flag to true
    },
    // Method to cancel deletion action
    cancelDelete() {
      this.isDelete = false; // Reset isDelete flag
    },
    // Method to initiate new password action
    onNewPassword() {
      this.isNewPassword = true; // Set isNewPassword flag to true
    },
    // Method to handle updating user's password
    async handleNewPassword(newPassword, oldPassword) {
      try {
        // Call authentication service to update user's password
        await authService.updateUserPassword(newPassword, oldPassword);
        // Show success message after password update
        ElMessage({
          type: 'success',
          message: 'Password updated successfully'
        });
      } catch (err) {
        // Handle errors gracefully
        errorHandler(err);
        // Emit 'refresh' event to update user data
        this.$emit('refresh');
      }
      // Reset isNewPassword flag
      this.isNewPassword = false;
    },
    // Method to update user details
    async updateDetails() {
      // Reset editing and updating flags
      this.isEditing = false;
      this.updating = false;
      try {
        // Call authentication service to update user details
        await authService.updateUser(this.userDetails);
        // Show success message after updating user details
        ElMessage({
          type: 'success',
          message: 'User details updated successfully'
        });
        // Emit 'refresh' event to update user data
        this.$emit('refresh');
      } catch (err) {
        // Handle errors gracefully
        errorHandler(err);
        // Emit 'refresh' event to update user data
        this.$emit('refresh');
      }
    },
    // Method to delete user account
    async deleteAccount() {
      // Reset isDelete flag
      this.isDelete = false;
      try {
        // Call authentication service to delete user account
        await authService.deleteUser();
        // Show success message after deleting user account
        ElMessage({
          type: 'success',
          message: 'User account deleted successfully'
        });
        // Clear user data from the user store and redirect to login page
        this.userStore.user = null;
        this.userStore.token = null;
        this.$router.push('/login');
      } catch (err) {
        // Handle errors gracefully
        errorHandler(err);
      }
    }
  },
  // Computed properties for the component
  computed: {
    ...mapStores(useUserStore) // Mapping user store as a computed property
  },
  // Lifecycle hook called when the component is created
  async created() {
    // Emit 'refresh' event to update user data
    this.$emit('refresh');
  }
};
</script>

