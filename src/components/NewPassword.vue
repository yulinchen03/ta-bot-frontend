<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto flex justify-center"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Change Password
              </h3>
              <div class="mt-2">
                <input
                  type="password"
                  placeholder="Old Password"
                  v-model="oldPassword"
                  class="w-full px-3 py-2 placeholder-gray-500 border rounded-md"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  v-model="newPassword"
                  class="w-full px-3 py-2 placeholder-gray-500 border rounded-md mt-2"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            @click="changePassword"
          >
            Save
          </button>
          <button
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            @click="cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Data properties for the component
  data() {
    return {
      // Flag to control visibility of the modal
      showModal: false,
      // Input fields for old and new passwords
      oldPassword: '',
      newPassword: ''
    };
  },
  // Methods for the component
  methods: {
    // Method to handle password change
    changePassword() {
      // Check if both old and new passwords are filled
      if (this.newPassword === '' || this.oldPassword === '') {
        // Show alert if any field is empty
        alert('Please fill in all the fields.');
        return;
      }
      // Emit 'newPass' event with old and new passwords
      this.$emit('newPass', this.newPassword, this.oldPassword);
    },
    // Method to cancel password change operation
    cancel() {
      // Emit 'cancel' event
      this.$emit('cancel');
    }
  }
};
</script>

