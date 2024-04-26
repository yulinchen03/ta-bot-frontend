<template>
  <div
    class="w-[85vw] box-border border border-1 align-middle rounded-3xl border-ut-light-gray flex justify-between p-3"
  >
    <div class="flex w-full items-center">
      <img
        :src="'https://xsgames.co/randomusers/avatar.php?g=pixel&' + user.id"
        class="w-12 h-12 aspect-square rounded-full mr-6"
      />
      <div class="flex items-center gap-4">
        <div class="grid grid-cols-1 items-center">
          <div v-if="!showEdit" class="text-lg w-fit h-fit">
            <b
              >{{ user.name }} {{ user.surname }}
              <span class="text-lg text-ut-gold">({{ user.role }})</span></b
            >
          </div>
          <div v-if="!showEdit" class="text-lg w-fit h-fit text-ut-light-gray">
            <i>{{ user.email }}</i>
          </div>
        </div>
        <el-form :inline="true" style="width: 35vw" v-if="showEdit">
          <el-form-item label="Name" class="editUserFormItem" label-width="auto">
            <el-input
              @keydown="preventEnter"
              v-model="user.name"
              v-if="showEdit"
              placeholder="name"
              style="width: 10vw"
            />
          </el-form-item>
          <el-form-item label="Surname" class="editUserFormItem" label-width="auto">
            <el-input
              @keydown="preventEnter"
              v-model="user.surname"
              v-if="showEdit"
              placeholder="surname"
              style="width: 10vw"
            />
          </el-form-item>
          <el-form-item label="Email address" class="editUserFormItem" label-width="auto">
            <el-input
              @keydown="preventEnter"
              v-model="user.email"
              v-if="showEdit"
              placeholder="email"
              style="width: 23vw"
            />
          </el-form-item>
        </el-form>
        <el-button
          class="custom-button"
          @keypress.enter.native.prevent
          @click="
            editUserAdmin(user.id, { name: user.name, surname: user.surname, email: user.email })
          "
          v-if="showEdit"
          >Save
        </el-button>
      </div>
    </div>
    <div class="flex justify-end">
      <div class="flex items-center gap-4">
        <el-button @keydown="onKeyDown" @click.stop="refresh" type="primary" text
          >Edit User
        </el-button>
        <el-button
          v-if="user.role === 'student'"
          @click.stop="this.$emit('switchRole')"
          type="success"
          text
          >Set as teacher
        </el-button>
        <el-button
          v-if="user.role === 'teacher'"
          @click.stop="this.$emit('switchRole')"
          type="warning"
          text
          >Set as student
        </el-button>
        <el-button @click.stop="this.$emit('deleteUser')" type="danger" text
          >Delete User
        </el-button>
      </div>
    </div>
    <!-- END -->
  </div>
</template>

<script>
export default {
  // Data properties for the component
  data() {
    return {
      // Initializing data property to control edit mode
      showEdit: false
    };
  },
  // Props received by the component
  props: ['user'],
  // Events emitted by the component
  emits: ['deleteUser', 'switchRole', 'editUserAdmin', 'refresh'],
  // Methods for the component
  methods: {
    // Method to trigger edit mode for admin user
    editUserAdmin(id, user) {
      // Emit 'editUserAdmin' event with id and user data
      this.$emit('editUserAdmin', id, user);
      // Hide edit mode after emitting event
      this.showEdit = false;
    },
    // Method to toggle refresh action and show/hide edit mode
    refresh() {
      // Toggle refresh action
      if (this.showEdit) {
        this.$emit('refresh');
      }
      // Toggle showEdit flag to show/hide edit mode
      this.showEdit = !this.showEdit;
    },
    // Method to prevent default action when pressing Enter key
    preventEnter(event) {
      // Prevent default action if Enter key is pressed
      if (event.code === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    // Method to prevent default action when pressing Space or Enter key
    onKeyDown(event) {
      // Prevent default action if Space or Enter key is pressed
      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
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
  border-color: #cf0072;
}

.custom-button:hover {
  background-color: white;
  color: black;
  font-weight: bold;
  border-color: #cf0072;
}

.editUserFormItem .el-form-item__label {
  color: black;
  font-weight: bold;
}
</style>
