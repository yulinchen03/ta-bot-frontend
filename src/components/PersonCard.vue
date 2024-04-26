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
  data() {
    return {
      showEdit: false
    };
  },
  props: ['user'],
  emits: ['deleteUser', 'switchRole', 'editUserAdmin', 'refresh'],
  methods: {
    editUserAdmin(id, user) {
      this.$emit('editUserAdmin', id, user);
      this.showEdit = false;
    },
    refresh() {
      if (this.showEdit) {
        this.$emit('refresh');
      }
      this.showEdit = !this.showEdit;
    },
    preventEnter(event) {
      if (event.code === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    onKeyDown(event) {
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
