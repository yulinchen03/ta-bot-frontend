<template>
  <div class="relative overflow-hidden bg-cover bg-no-repeat p-12 text-center h-[100vh]"
       style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/4/44/University_of_Twente.jpg');">
    <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
         style="background-color: rgba(0, 0, 0, 0.6)">
      <div class="flex h-full items-center justify-center">
        <div class="text-white bg-ut-dark-gray h-[80vh] w-[33vw] bg-opacity-50 flex justify-center">
          <div class="grid grid-rows-8">
            <div class="row-start-1 row-end-1 mx-auto object-scale-down w-1/2">
              <img src="/favicon.ico">
            </div>
            <div class="p-4 space-y-4 md:space-y-6 sm:p-8 row-start-2 row-end-7">
              <div class="grid grid-cols-5">
                <div class="flex justify-start col-span-2">
                  <el-button @click="back" type="primary" class="custom-button" :round="true">
                    <div class="flex items-center">
                      <el-icon class="mr-2"><Back /></el-icon>
                      Back
                    </div>
                  </el-button>
                </div>
                <div class="flex justify-start col-span-3">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign Up
                  </h1>
                </div>
              </div>
              <el-form class="space-y-4 md:space-y-6 demo-dynamic"
                       label-width="auto"
              >
                <el-form-item label="First Name">
                  <div :class="{ 'error': v$.firstName.$error }">
                    <input @change="this.v$.firstName.$touch()" v-model="firstName" class="mx-3 bg-gray-50
                    border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                     focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Firstname">

                    <p v-if="v$.firstName.$error" class="text-xs text-red-500 flex justify-end">First Name is too short.</p>
                  </div>
                </el-form-item>
                <el-form-item label="Last Name">
                  <div :class="{ 'error': v$.lastName.$error }">
                    <input @change="this.v$.lastName.$touch()" v-model="lastName" class="mx-3 bg-gray-50 border border-gray-300
                     text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
                     block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Lastname">
                    <div v-if="v$.lastName.$error" class="text-xs text-red-500 flex justify-end">Last Name is too short.</div>
                  </div>
                </el-form-item>
                <el-form-item label="Email Address">
                  <div :class="{ 'error': v$.email.$error }">
                    <input @change="this.v$.email.$touch()" type="email" v-model="email" class="mx-3 bg-gray-50 border
                     border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
                      block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                       dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email Address">
                    <div v-if="v$.email.$error" class="text-xs text-red-500 flex justify-end">Email is invalid.</div>
                  </div>
                </el-form-item>
                <el-form-item label="Password">
                  <div :class="{ 'error': v$.password.$error }">
                    <input @change="this.v$.password.$touch()" type="password" v-model="password"
                           class="mx-3 bg-gray-50 border border-gray-300
                     text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                      focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                       dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                        dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password">
                    <div v-if="v$.password.$error" class="text-xs text-red-500 flex justify-end">Password is less than 8 characters.
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="Confirm Password">
                  <div :class="{ 'error': v$.confirmation.$error }">
                    <input @change="this.v$.confirmation.$touch()" type="password" v-model="confirmation"
                           class="mx-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Confirm Password">
                    <div v-if="v$.confirmation.$error" class="text-xs text-red-500 flex justify-end">Passwords do not match!</div>
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <div class="p-4 space-y-4 md:space-y-6 sm:p-8 flex items-center">
              <div class="grid grid-cols-1 w-full h-full items-center">
                <div class="flex items-center justify-center w-full">
                  <el-checkbox class="confirmation-message mb-5" v-model="confirmData">I confirm that the above information is correct.</el-checkbox>
                </div>
                <el-button @click="signup" :disabled="!confirmData" :round="true"
                           class="custom-button w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Sign Up
                </el-button>
              </div>
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
import {mapStores} from "pinia";

import useUserStore from "@/stores/user";
import authService from "@/services/authService.js";
export default {
  setup: () => ({ v$: useVuelidate() }),
  data: () => ({firstName: 'Penis', lastName: 'Krylov', email: 'p.krylov@teacher.utwente.nl', password: 'Password123', confirmation: 'Password123', confirmData: false}),
  validations() {
    return {
      firstName: {required, minLength: minLength(2)},
      lastName: {required, minLength: minLength(2)},
      email: {required, email},
      password: {
        required,
        minLength: minLength(8),
        hasUpperCase: value => /[A-Z]/.test(value),
        hasLowerCase: value => /[a-z]/.test(value),
        hasNumber: value => /[0-9]/.test(value)
      },
      confirmation: {required, sameAsPassword: sameAs(this.password)}
    }
  },
  computed: {
    ...mapStores(useUserStore)
  },
  methods: {
     async signup() {
      const validity = await this.v$.$validate()
       this.confirmData=false
      if (!validity) {
        // handle error
        ElMessage({
          showClose: true,
          message: 'Something is not right. Please check your details.',
          type: 'warning',
          plain: true,
        })
      } else {
        // handle success
        try {

            const res = await authService.register(this.name, this.surname, this.email, this.password, this.confirm_password)

          ElMessage({
            message: 'Signup successful.',
            type: 'success',
            plain: true,
          })
          this.$router.push('/login')
        }
        catch(err)
        {
          // TODO handle error
          console.log(err)
        }

      }
    },
    back() {
       this.$router.push('/login')
    }
  },
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

.el-form-item__label {
  height: auto;
  line-height: normal;
  text-align: right;
  font-size: 16px;
  margin-top: 6px;
  box-sizing: border-box;
  color: white;
}

.error input {
  border-color: red;
}

.confirmation-message {
  color: white
}
</style>