<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <!-- Sidebar -->
    <Sidebar></Sidebar>
    <!-- Main content -->
    <div class="grid grid-cols-1 relative h-screen w-screen">
      <Header :title="pageTitle"></Header>
      <div class="mx-20 overflow-y-auto w-[calc(100vw-200px)] h-[calc(100vh-100px)] flex flex-col gap-3 ">
        <!-- Search Bar -->
        <input class="p-2 w-full rounded-lg" type="text" v-model="searchQuery" placeholder="Search by name, email, or role">
        <!-- List of Person Cards -->
        <PersonCard v-for="user in filteredUsers" :key="user.email" :user="user" />
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

export default {
  components: {
    PersonCard,
    Header,
    Sidebar,
  },
  data() {
    return {
      pageTitle: 'My People',
      searchQuery: '',
      users: [
        {
          name: 'John Doe',
          email: 'example@gmail.com',
          role: 'teacher'
        },
        {
          name: 'Jane Doe',
          email: 'jane@example.com',
          role: 'student'
        },
        {
          name: 'Alice Smith',
          email: 'alice@example.com',
          role: 'student'
        },
        {
          name: 'Bob Johnson',
          email: 'bob@example.com',
          role: 'teacher'
        },
        {
          name: 'Charlie Brown',
          email: 'charlie@example.com',
          role: 'student'
        },
        {
          name: 'David Lee',
          email: 'david@example.com',
          role: 'teacher'
        },
        {
          name: 'Eva Taylor',
          email: 'eva@example.com',
          role: 'student'
        },
        {
          name: 'Franklin Martinez',
          email: 'franklin@example.com',
          role: 'teacher'
        }
      ],
      editUser: {
        name: '',
        email: ''
      }
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
    // this.refresh()
  },
  methods: {
    async refresh() {
      try {
        const res = (await userService.getUsers()).data.data
        this.user = res
      } catch (err) {
        ElMessage({
          showClose: true,
          message: err.response.data.message,
          type: 'error'
        })
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
        ElMessage({
          showClose: true,
          message: err.response.data.message,
          type: 'error'
        })
      }
    },
    async promoteToTeacher(userId) {
      try {
        await userService.promoteToTeacher(userId)
        this.refresh()
        ElMessage({
          showClose: true,
          message: 'User promoted to teacher successfully',
          type: 'success'
        })
      } catch (err) {
        ElMessage({
          showClose: true,
          message: err.response.data.message,
          type: 'error'
        })
      }
    },
    async demoteToStudent(userId) {
      try {
        await userService.demoteToStudent(userId)
        this.refresh()
        ElMessage({
          showClose: true,
          message: 'User demoted to student successfully',
          type: 'success'
        })
      } catch (err) {
        ElMessage({
          showClose: true,
          message: err.response.data.message,
          type: 'error'
        })
      }
    },
    async editUser(userId) {
      try {

        await userService.editUser(userId, {
          name: this.editUser.name,
          email: this.editUser.email
        })
        this.refresh()
        ElMessage({
          showClose: true,
          message: 'User edited successfully',
          type: 'success'
        })
      } catch (err) {
        ElMessage({
          showClose: true,
          message: err.response.data.message,
          type: 'error'
        })
      }
    }
  }
}
</script>