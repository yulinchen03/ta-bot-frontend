<template>
  <div class="w-[300px] h-full bg-white text-black">
    <div class="h-[100px] w-full flex justify-center items-center">
      <img src="https://www.utwente.nl/logo-stacked.png" class="object-scale-down max-h-full">
    </div>
    <div class="h-[calc(100vh-120px)] bg-white py-[20px]">
      <div class="flex flex-col justify-between h-full">
        <div class="px-[20px] flex flex-col space-y-[10px]">
          <router-link to="/courses"
                       class="inline-flex relative items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white">
            <el-icon class="ml-5" :size="25">
              <HomeFilled />
            </el-icon>
            <h3 class="px-5 font-arial">Courses</h3>
            <div
                v-if="courseCount > 0"
                class="absolute right-5 bg-ut-pink rounded-md text-white text-xs w-5 h-5 flex items-center justify-center"
            >
              {{ courseCount }}
            </div>
          </router-link>
          <router-link to="/profile"
                       class="inline-flex relative items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white">
            <el-icon class="ml-5" :size="25">
              <Avatar />
            </el-icon>
            <h3 class="px-5 font-arial">Profile</h3>
          </router-link>
          <router-link to="/help"
                       class="inline-flex relative items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white">
            <el-icon class="ml-5" :size="25">
              <InfoFilled/>
            </el-icon>
            <h3 class="px-5 font-arial">Help</h3>
          </router-link>
        </div>
        <div class="px-[20px] flex flex-col space-y-[10px]">
          <button @click="dialogVisible=true"
                  class="inline-flex relative items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white">
            <el-icon class="ml-5" :size="25">
              <SwitchButton/>
            </el-icon>
            <h3 class="px-5 font-arial">Logout</h3>
          </button>
        </div>
      </div>
    </div>
  </div>
  <el-dialog
      v-model="dialogVisible"
      title="Confirm logout"
      width="50vw"
      center
  >
    <span class="text-xl flex justify-center">Are you sure you want to log out?</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button size="large" @click="dialogVisible = false">Cancel</el-button>
        <el-button size="large" type="danger" @click="logout">
          Logout
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>


<script>

export default {
  data() {
    return {
      dialogVisible: false,
      confirmLogout: false,
      courseCount: 3,
    };
  },
  methods: {
    logout() {
      this.confirmLogout = true
      this.dialogVisible = false
      console.log('Logging out...')
      this.$router.push('/login');
      // TODO LOGOUT LOGIC TO BE ADDED
    }
  },
};
</script>
