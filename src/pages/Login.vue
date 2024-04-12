<template>
  <div class="relative overflow-hidden bg-cover bg-no-repeat p-12 text-center h-[100vh]"
       style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/4/44/University_of_Twente.jpg');">
    <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
         style="background-color: rgba(0, 0, 0, 0.6)">
      <div class="flex h-full items-center justify-center">
        <div class="text-white bg-ut-dark-gray h-[55vh] w-[33vw] bg-opacity-50 flex justify-center">
          <div class="grid grid-rows-5">
            <div class="row-start-1 row-end-1 mx-auto object-scale-down w-1/2">
              <img src="/favicon.ico">
            </div>
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in
              </h1>
              <el-form class="space-y-4 md:space-y-6 demo-dynamic" label-width="auto">
                <el-form-item label="Email">
                  <div :class="{ 'error': v$.loginForm.email.$error }">
                    <input @change="this.v$.loginForm.email.$touch()" type="email" v-model="loginForm.email" class="mx-3 bg-gray-50
                    border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                     focus:border-primary-600 block w-[20vw] p-2.5 dark:bg-gray-700 dark:border-gray-600
                      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Email">
                    <div v-if="v$.loginForm.email.$error" class="text-xs text-red-500 flex justify-end">Email is invalid.</div>
                  </div>
                </el-form-item>
                <el-form-item label="Password">
                  <div :class="{ 'error': v$.loginForm.password.$error }">
                    <input @change="this.v$.loginForm.password.$touch()" type="password" v-model="loginForm.password" class="mx-3 bg-gray-50
                    border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                     focus:border-primary-600 block w-[20vw] p-2.5 dark:bg-gray-700 dark:border-gray-600
                      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Password">
                    <div v-if="v$.loginForm.password.$error" class="text-xs text-red-500 flex justify-end">Password is less than 8 characters.</div>
                  </div>
                </el-form-item>
              </el-form>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="remember" v-model="loginForm.rememberMe" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <a @click="goToResetPassword" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              <el-button @click="login" class="custom-button w-3/4 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</el-button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <a @click="goToSignup" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useVuelidate} from '@vuelidate/core'
import {required, minLength, email, sameAs} from '@vuelidate/validators'
import {ElMessage} from "element-plus";
import useUserStore from "@/stores/user";
import {mapStores} from "pinia";
import authService from "@/services/authService.js";
  export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
      return {
        // loginForm: {email: 'studentBotTest@student.utwente.nl', password: 'Password123', rememberMe: false},
        loginForm: {email: 'adminuser@teacher.utwente.nl', password: 'Password123', rememberMe: false},
      }
    },
    computed: {
      ...mapStores(useUserStore)
    },
    validations() {
      return {
        loginForm: {
          email: {required, email},
          password: {
            required,
            minLength: minLength(8),
            hasUpperCase: value => /[A-Z]/.test(value),
            hasLowerCase: value => /[a-z]/.test(value),
            hasNumber: value => /[0-9]/.test(value)
          },
        }
      }
    },
    methods: {
      async login(){
        const validity = await this.v$.$validate()
        if (!validity) {
          // handle error
          ElMessage({
            showClose: true,
            message: 'Something is not right. Please check your credentials.',
            type: 'warning',
            plain: true,
          })
        } else {
          try {

            console.log(this.loginForm.email, this.loginForm.password)
            await authService.login(this.loginForm.email, this.loginForm.password).then((res) => {

              this.userStore.token = res.headers.authorization.split(' ')[1]
              this.userStore.user = {email: res.data.data.email, name: res.data.data.username, role: res.data.data.role}

              console.log('token: ', this.userStore.token)
              if (res.status === 200) {
                ElMessage({
                  message: 'Login successful.',
                  type: 'success',
                  plain: true,
                })

                if(res.data.data.role === 'admin') return this.$router.push('/courses-admin')
                this.$router.push('/courses')
              }
              else {
                ElMessage({
                  message: 'Incorrect credentials',
                  type: 'warning',
                  plain: true,
                })

              }
            })
          }
          catch(err) {
            console.log(err)
            ElMessage({
              message: err.message,
              type: 'warning',
              plain: true,
            })
          }

        }
        //
        // todo login API

      },
      goToSignup(){
        this.$router.push('/signup');
      },
      goToResetPassword(){
        this.$router.push('/reset')
      }
    }
  }
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
</style>