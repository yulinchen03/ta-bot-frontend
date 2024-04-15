
<template>
    <div class="flex justify-center">
            <div class="px-5 py-2 bg-gray-200 mt-5 m:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 mx-auto">
                <form @submit.prevent="onSubmit">
                    <div class="mb-4">
                        <label for="name" class="block text-black text-lg font-bold mb-2">Name</label>
                        <input type="text" id="name" v-model="userDetails.name" 
                                :class="{ 'bg-gray-200': !isEditing, 'bg-white': isEditing }"
                               class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-200"
                               :disabled="!isEditing">
                    </div>
                    <div class="mb-4">
                        <label for="surname" class="block text-black text-lg font-bold mb-2">Surname</label>
                        <input type="text" id="surname" v-model="userDetails.surname"
                                :class="{ 'bg-gray-200': !isEditing, 'bg-white': isEditing }"
                               class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-200"
                               :disabled="!isEditing">
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-black text-lg font-bold mb-2">Email</label>
                        <input type="email" id="email" v-model="userDetails.email"
                                :class="{ 'bg-gray-200': !isEditing, 'bg-white': isEditing }"
                               class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-200"
                               :disabled="!isEditing">
                    </div>
                    <div class="flex items-center justify-between">
                        <button v-if="!isEditing" class="w-20 bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="edit">
                            Edit
                        </button>
                        <button v-else class="w-20 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                         @click="saveEdit">
                            Save
                        </button>
                        <button class="w-35 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="onNewPassword">
                            New Password
                        </button>
                        <button class="w-20 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="onDelete">
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
import ProfilePopUp from "@/components/ProfilePopUp.vue";
import NewPassword from "@/components/NewPassword.vue";
import { mapStores} from "pinia";
import useUserStore from "@/stores/user.js";
import authService from "@/services/authService.js";
import {ElMessage} from "element-plus";
import errorHandler from "@/utils/errorHandler.js";
export default {
    components: {
        NewPassword,
        ProfilePopUp,
    },
    name: 'UserDetails',
  props: ['userDetails'],
  emits: ['refresh'],
    data() {
        return {
            del: 'delete',
            updating: false,
            isEditing: false,
            isDelete: false,
            isNewPassword: false,
        };
    },
    methods: {
        edit() {
            this.isEditing = true;

        },
        saveEdit() {
            if (this.userDetails.name === '' || this.userDetails.surname === '' || this.userDetails.email === '') {
              ElMessage({
                    type: 'error',
                    message: 'Please fill in all fields',

                })
                return;
            }
            this.updating = true;
        },
        cancelUpdate() {
            this.updating = false;
            this.isEditing = false;


        },
        onDelete() {
            this.isDelete = true;
        },
        cancelDelete() {
            this.isDelete = false;
        },
        onNewPassword() {
            this.isNewPassword = true;
        },
        async handleNewPassword(newPassword, oldPassword) {


          try {
            await authService.updateUserPassword(newPassword, oldPassword);

            ElMessage({
              type: 'success',
              message: 'Password updated successfully',
            });

          } catch (err) {
            errorHandler(err)
            this.$emit('refresh');
          }

          this.isNewPassword = false;

        },
        async updateDetails() {
            this.isEditing = false;
            this.updating = false;
          try {
           await authService.updateUser(this.userDetails);

            ElMessage({
              type: 'success',
              message: 'User details updated successfully',
            });
            this.$emit('refresh');


            this.updating = false;
            this.isEditing = false;
          } catch (err) {
            errorHandler(err)
            this.$emit('refresh');

          }

        },
        async deleteAccount() {
            this.isDelete = false;

            try {
             await authService.deleteUser();


              ElMessage({
                type: 'success',
                message: 'User account deleted successfully',
              });
              this.userStore.user = null;
              this.userStore.token = null;
              this.$router.push('/login');
            } catch (err) {
              errorHandler(err)
            }

        },
    },
    computed: {
    ...mapStores(useUserStore)
    },
    async created() {
      this.$emit('refresh');
    },
};
</script>