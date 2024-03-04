<template>
    <div class="w-[300px] h-full bg-white text-black">
      <div class="h-[100px] w-full flex justify-center items-center">
        <img src="https://www.utwente.nl/logo-stacked.png" class="object-scale-down max-h-full">
      </div>
      <div class="h-[calc(100vh-120px)] bg-white py-[20px]">
        <div class="flex flex-col justify-between h-full">
          <div class="px-[20px] flex flex-col space-y-[10px]">
            <router-link to="/" class="inline-flex relative items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white">
              <el-icon class="ml-5" :size="25"><HomeFilled/></el-icon>
              <h3 class="px-5 font-arial">Dashboard</h3>
            </router-link>
            <router-link to="/courses" class="inline-flex relative items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white">
              <el-icon class="ml-5" :size="25"><Notebook/></el-icon>
              <h3 class="px-5 font-arial">Courses</h3>
            </router-link>
            <router-link to="/notifications" class="inline-flex relative items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white">
              <el-icon class="ml-5" :size="25"><Bell/></el-icon>
              <h3 class="px-5 font-arial">Notifications</h3>
            </router-link>
            <router-link to="/profile" class="inline-flex relative items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white">
              <el-icon class="ml-5" :size="25"><User/></el-icon>
              <h3 class="px-5 font-arial">Profile</h3>
            </router-link>
          </div>
          <div class="px-[20px] flex flex-col space-y-[10px]">
            <router-link to="/settings" class="inline-flex relative items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white">
              <el-icon class="ml-5" :size="25"><Setting/></el-icon>
              <h3 class="px-5 font-arial">Settings</h3>
            </router-link>
            <router-link to="/help" class="inline-flex relative items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white">
              <el-icon class="ml-5" :size="25"><InfoFilled/></el-icon>
              <h3 class="px-5 font-arial">Help</h3>
            </router-link>
            <router-link to="/logout" class="inline-flex relative items-center py-[10px] px-[5px] w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-black hover:text-white">
              <el-icon class="ml-5" :size="25"><SwitchButton/></el-icon>
              <h3 class="px-5 font-arial">Logout</h3>
            </router-link>
          </div>
        </div>
      </div>
    </div>
</template>