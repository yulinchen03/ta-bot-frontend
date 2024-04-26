<template>
  <div class="w-[120px] h-full bg-white text-black">
    <div class="h-[120px] w-full flex justify-center items-center">
      <img src="/logoBlack.png" class="object-scale-down max-h-full p-3" />
    </div>
    <div class="h-[calc(100vh-120px)] bg-white py-[20px]">
      <div class="flex flex-col justify-between h-full">
        <div class="px-[20px] flex flex-col space-y-[10px]">
          <router-link :to="role === 'admin' ? '/courses-admin' : '/courses'">
            <div
              class="flex justify-center items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white"
            >
              <div class="grid grid-cols-1">
                <div class="flex justify-center mb-1">
                  <el-icon :size="30">
                    <HomeFilled />
                  </el-icon>
                </div>
                <h3 class="font-arial">Courses</h3>
              </div>
            </div>
          </router-link>
          <router-link v-if="role === 'teacher'" to="/notifications">
            <div
              class="flex justify-center items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white"
            >
              <div class="grid grid-cols-1">
                <div class="flex justify-center mb-1">
                  <el-badge :value="notificationCount" class="item">
                    <el-icon :size="30">
                      <Comment />
                    </el-icon>
                  </el-badge>
                </div>
                <h3 class="font-arial">Inbox</h3>
              </div>
            </div>
          </router-link>
          <router-link v-if="role === 'admin'" to="/people">
            <div
              class="flex justify-center items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white"
            >
              <div class="grid grid-cols-1">
                <div class="flex justify-center mb-1">
                  <el-icon :size="30">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7"
                      />
                    </svg>
                  </el-icon>
                </div>
                <h3 class="font-arial">People</h3>
              </div>
            </div>
          </router-link>
          <router-link to="/profile">
            <div
              class="flex justify-center items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white"
            >
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
          <router-link v-if="isTeacher" to="/notifications">
            <div
              class="flex justify-center items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white"
            >
              <div class="grid grid-cols-1">
                <div class="flex justify-center mb-1">
                  <el-badge class="item">
                    <el-icon :size="30">
                      <Comment />
                    </el-icon>
                  </el-badge>
                </div>
                <h3 class="font-arial">Inbox</h3>
              </div>
            </div>
          </router-link>
          <router-link to="/helpcenter">
            <div
              class="flex justify-center items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white"
            >
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
          <button
            @click="dialogVisible = true"
            class="grid grid-cols-1 justify-center items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white"
          >
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
  <el-dialog v-model="dialogVisible" title="Confirm logout" width="50vw" center>
    <span class="text-xl flex justify-center">Are you sure you want to log out?</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button size="large" @click="dialogVisible = false">Cancel</el-button>
        <el-button size="large" type="danger" @click="logout"> Logout </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { mapStores } from 'pinia';
import useUserStore from '@/stores/user';
import authService from '@/services/authService.js';
import { ElMessage } from 'element-plus';
import errorHandler from '@/utils/errorHandler.js';

export default {
  data() {
    return {
      dialogVisible: false,
      confirmLogout: false,
      courseCount: 3,
      isTeacher: false
    };
  },
  computed: {
    ...mapStores(useUserStore, 'user')
  },
  created() {
    this.role = this.userStore.user.role;
  },
  methods: {
    async logout() {
      try {
        await authService.logout();
        this.confirmLogout = true;
        this.dialogVisible = false;
        this.userStore.user = null;
        this.userStore.token = null;
        console.log('Logging out...');
        this.$router.push('/login');
        ElMessage({
          message: 'Logged out successfully',
          type: 'success'
        });
      } catch (err) {
        errorHandler(err);
      }
    }
  }
};
</script>
