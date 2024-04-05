<template>
  <div class="relative overflow-hidden bg-cover bg-no-repeat p-12 text-center h-[100vh]"
       style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/4/44/University_of_Twente.jpg');">
    <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
         style="background-color: rgba(0, 0, 0, 0.6)">
      <div class="flex h-full items-center justify-center">
        <div class="text-white bg-ut-dark-gray h-[60vh] w-[33vw] bg-opacity-50 flex justify-center">
          <div class="grid grid-rows-5">
            <div class="row-start-1 row-end-1 mx-auto object-scale-down w-1/2">
              <img src="/favicon.ico">
            </div>
            <div class="p-4 space-y-4 md:space-y-6 sm:p-8 row-start-2 row-end-4">
              <div class="grid grid-cols-7">
                <div class="flex justify-start col-span-2">
                  <el-button @click="back" type="primary" class="custom-button" :round="true">
                    <div class="flex items-center">
                      <el-icon class="mr-2">
                        <Back/>
                      </el-icon>
                      Back
                    </div>
                  </el-button>
                </div>
                <div class="flex justify-start col-span-5">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Reset Password
                  </h1>
                </div>
              </div>
              <el-form class="space-y-4 md:space-y-6 demo-dynamic"
                       label-width="auto"
              >
                <el-form-item label="Old Password">
                  <div :class="{ 'error': v$.resetForm.oldPassword.$error }">
                    <input @change="this.v$.resetForm.oldPassword.$touch()" type="password" v-model="resetForm.oldPassword"
                           class="mx-3 bg-gray-50 border border-gray-300
                     text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                      focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                       dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                        dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password">
                    <div v-if="v$.resetForm.oldPassword.$error" class="text-xs text-red-500 flex justify-end">Password is less
                      than 8 characters.
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="New Password">
                  <div :class="{ 'error': v$.resetForm.newPassword.$error }">
                    <input @change="this.v$.resetForm.newPassword.$touch()" type="password" v-model="resetForm.newPassword"
                           class="mx-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="New Password">
                    <div v-if="v$.resetForm.newPassword.$error" class="text-xs text-red-500 flex justify-end">Password is less
                      than 8 characters.
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="Confirm New Password">
                  <div :class="{ 'error': v$.resetForm.$error }">
                    <input @change="this.v$.resetForm.confirmation.$touch()" type="password" v-model="resetForm.confirmation"
                           class="mx-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Confirm New Password">
                    <div v-if="v$.resetForm.confirmation.$error" class="text-xs text-red-500 flex justify-end">Passwords do not
                      match!
                    </div>
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <div class="p-4 space-y-4 md:space-y-6 sm:p-8 flex items-center row-start-5 row-end-5">
              <el-button @click="reset" :round="true"
                         class="custom-button w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Reset
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useVuelidate} from '@vuelidate/core'
import {required, minLength, sameAs} from '@vuelidate/validators'
import {ElMessage} from "element-plus";

export default {
  setup: () => ({v$: useVuelidate()}),
  data: () => ({resetForm: {oldPassword: '', newPassword: '', confirmation: ''}}),
  validations() {
    return {
      resetForm: {
        oldPassword: {
          required,
          minLength: minLength(8),
          hasUpperCase: value => /[A-Z]/.test(value),
          hasLowerCase: value => /[a-z]/.test(value),
          hasNumber: value => /[0-9]/.test(value)
        },
        newPassword: {
          required,
          minLength: minLength(8),
          hasUpperCase: value => /[A-Z]/.test(value),
          hasLowerCase: value => /[a-z]/.test(value),
          hasNumber: value => /[0-9]/.test(value)
        },
        confirmation: {required, sameAsPassword: sameAs(this.resetForm.newPassword)}
      }
    }
  },
  methods: {
    async reset() {
      const validity = await this.v$.$validate()
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
        ElMessage({
          message: 'Reset successful.',
          type: 'success',
          plain: true,
        })
        this.$router.push('/login')
      }
      //
      // todo API CALL
      //
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