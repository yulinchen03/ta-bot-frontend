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
              <h3
                v-if="isDelete()"
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                Are you sure you want to delete your account?
              </h3>
              <h3 v-else class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Would you like to save your changes?
              </h3>
            </div>
          </div>
        </div>
        <div v-if="isDelete()" class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            @click="deleteAc"
          >
            Delete
          </button>
          <button
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            @click="cancel"
          >
            Cancel
          </button>
        </div>
        <div v-else class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            @click="saveEdit"
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
  // Component props definition
  props: {
    // Prop for specifying the type of action ('save', 'delete', etc.)
    type: String
  },
  // Methods for the component
  methods: {
    // Method to emit 'update' event when saving edits
    saveEdit() {
      this.$emit('update');
    },
    // Method to emit 'delete' event when deleting an item
    deleteAc() {
      this.$emit('delete');
    },
    // Method to emit 'cancel' event when canceling an action
    cancel() {
      this.$emit('cancel');
    },
    // Method to check if the type of action is 'delete'
    isDelete() {
      return this.type === 'delete'; // Return true if type is 'delete', otherwise false
    }
  }
};
</script>

