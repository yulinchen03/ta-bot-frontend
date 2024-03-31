<template>
  <div class="w-[120px] h-full bg-white text-black">
    <div class="h-[120px] w-full flex justify-center items-center">
      <img src="https://www.utwente.nl/logo-stacked.png" class="object-scale-down max-h-full">
    </div>
    <div class="h-[calc(100vh-120px)] bg-white py-[20px]">
      <div class="flex flex-col justify-between h-full">
        <div class="px-[20px] flex flex-col space-y-[10px]">
            <div @click="navigateToCourse" class="flex justify-center items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white">
              <div class="grid grid-cols-1">
                <div class="flex justify-center mb-1">
                  <el-icon :size="30">
                    <HomeFilled />
                  </el-icon>
                </div>
                <h3 class="font-arial">Courses</h3>
              </div>
            </div>
          <!-- </router-link> -->
          <router-link to="/profile">
            <div class="flex justify-center items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white">
              <div class="grid grid-cols-1">
                <div class="flex justify-center mb-1">
                  <el-icon :size="30">
                    <Avatar />
                  </el-icon>
                </div>
                <h3 class="font-arial">Profile</h3>
              </div>
            </div>
          </router-link>
          <el-badge :value="messageCount" class="item">
            <router-link to="/messages">
              <div class="flex justify-center items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white">
                <div class="grid grid-cols-1">
                  <div class="flex justify-center mb-1">
                    <el-icon :size="30">
                      <Comment />
                    </el-icon>
                  </div>
                  <h3 class="font-arial">Messages</h3>
                </div>
              </div>
            </router-link>
          </el-badge>
          <router-link to="/helpcenter">
            <div class="flex justify-center items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white">
              <div class="grid grid-cols-1">
                <div class="flex justify-center mb-1">
                  <el-icon :size="30">
                    <InfoFilled />
                  </el-icon>
                </div>
                <h3 class="font-arial">Help</h3>
              </div>
            </div>
          </router-link>
        </div>
        <div class="px-[20px] flex flex-col space-y-[10px]">
          <button @click="dialogVisible=true"
                  class="grid grid-cols-1 justify-center items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white">
            <div class="grid grid-cols-1">
              <div class="flex justify-center mb-1">
                <el-icon :size="30">
                  <SwitchButton />
                </el-icon>
              </div>
              <h3 class="font-arial">Logout</h3>
            </div>
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
      messageCount: 12
    };
  },
  methods: {
    logout() {
      this.confirmLogout = true
      this.dialogVisible = false
      console.log('Logging out...')
      this.$router.push('/login');
      // TODO LOGOUT LOGIC TO BE ADDED
    },
    navigateToCourse() {
      this.$router.push('/courses');
    }
  },
};
</script>
