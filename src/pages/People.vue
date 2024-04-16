<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <!-- Sidebar -->
    <Sidebar></Sidebar>
    <!-- Main content -->
    <div class="grid grid-cols-1 relative h-screen w-screen overflow-x-clip">
      <Header :title="pageTitle"></Header>
      <div class="mx-10 w-[calc(100vw-120px)] h-[calc(100vh-100px)] flex flex-col gap-3">
        <!-- Search Bar -->
        <el-input class="p-2 rounded-lg" type="text" v-model="searchQuery" placeholder="Search by name, email, or role" style="width: 85vw"/>
        <!-- List of Person Cards -->
        <div class="overflow-y-scroll flex flex-col gap-3">
          <PersonCard @editUserAdmin="editUserAdmin" @switchRole="switchRole(user.id, user.role)" @deleteUser="deleteUser(user.id)" v-for="user in filteredUsers" :key="user.email" :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import { mapStores } from "pinia";
import useUserStore from "@/stores/user.js";
import PersonCard from "@/components/PersonCard.vue";
import userService from "@/services/userService.js";
import { ElMessage } from "element-plus";
import errorHandler from "@/utils/errorHandler.js";

export default {
  components: {
    PersonCard,
    Header,
    Sidebar,
  },
  data() {
    return {
      pageTitle: 'User Management',
      searchQuery: '',
      users: [],
    }
  },
  computed: {
    ...mapStores(useUserStore),
    filteredUsers() {
      const query = this.searchQuery.toLowerCase();
      return this.users.filter(user => {
        return user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.role.toLowerCase().includes(query);
      });
    }
  },
  created() {
    this.refresh()
  },
  methods: {
    async refresh() {
      try {
        const res = (await userService.getUsers()).data.data
        console.log(res)
        this.users = res
      } catch (err) {
        errorHandler(err)
      }
    },
    async deleteUser(userId) {
      try {
        await userService.deleteUser(userId)
        this.refresh()
        ElMessage({
          showClose: true,
          message: 'User deleted successfully',
          type: 'success'
        })
      } catch (err) {
        errorHandler(err)
      }
    },
    async switchRole(userId, role) {
      try {
        let changeTo = null;
        if(role === 'teacher') changeTo = 'student'
        else changeTo = 'teacher'
        await userService.switchRole(userId,changeTo)
        ElMessage({
          showClose: true,
          message: `User role changed to ${changeTo} successfully`,
          type: 'success'
        })
        this.refresh()
      } catch (err) {
        errorHandler(err)
      }
    },
    async editUserAdmin(userId, body) {
      console.log(userId, body)
      try {
        const {name, surname,  email} = body

        await userService.editUser(userId, {name,surname, email})
        this.refresh()
        ElMessage({
          showClose: true,
          message: 'User edited successfully',
          type: 'success'
        })
      } catch (err) {
        errorHandler(err)
      }
    }
  }
}
</script>