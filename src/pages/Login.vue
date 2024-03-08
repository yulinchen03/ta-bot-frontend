<script setup>

</script>

<template>
  <div class="relative overflow-hidden bg-cover bg-no-repeat p-12 text-center h-[100vh]"
       style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/4/44/University_of_Twente.jpg');">
    <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
         style="background-color: rgba(0, 0, 0, 0.6)">
      <div class="flex h-full items-center justify-center">
        <div class="text-white bg-ut-dark-gray h-[50vh] w-[33vw] bg-opacity-50 flex justify-center">
          <div class="grid grid-rows-3">
            <div class="row-start-1 row-end-2 mx-auto object-scale-down w-1/2 h-auto">
              <img src="/favicon.ico">
            </div>
            <div class="row-start-2 row-end-4 flex flex-col justify-between">
              <div class="grid grid-rows-6">
                <span class="font-arial font-bold text-3xl row-start-2 row-end-3">Login with UT Credentials</span>
                <div class="space-x-8 flex items-center justify-center row-start-5 row-end-6">
                  <el-button color="#cf0072" size="large" @click="studentLogin">as Student</el-button>
                  <el-button color="#cf0072" size="large" @click="staffLogin">as Teacher</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      studentLogin(){
        console.log('Student logging in...')
        this.$router.push('/dashboard');
      },
      staffLogin(){
        console.log('Staff logging in...')
        this.$router.push('/dashboard');
      }
    }
  }
</script>