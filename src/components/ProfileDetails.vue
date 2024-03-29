
<template>
    <div class="flex justify-center">
        <!-- <div class="mt-4 bg-white rounded-xl shadow-md overflow-hidden mb-2
                    md:max-w-2xl transition duration-500 ease-in-out transform
                    hover:scale-105 hover:shadow-glow border-ut-pink
                    transform-gpu origin-bottom
                    "> -->
            <!-- Existing content... -->

            <!-- Form Section in a separate box -->
            <div class="px-5 py-2 bg-gray-200 mt-5 m:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
                <form @submit.prevent="onSubmit">
                    <div class="mb-4">
                        <label for="name" class="block text-black text-lg font-bold mb-2">Name</label>
                        <input type="text" id="name" v-model="userDetails.name" 
                                :class="{ 'bg-gray-200': !isEditing, 'bg-white': isEditing }"
                               class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-200"
                               :disabled="!isEditing">
                    </div>
                    <div class="mb-4">
                        <label for="surname" class="block text-black text-lg font-bold mb-2">Surname</label>
                        <input type="text" id="surname" v-model="userDetails.surname"
                                :class="{ 'bg-gray-200': !isEditing, 'bg-white': isEditing }"
                               class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-200"
                               :disabled="!isEditing">
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-black text-lg font-bold mb-2">Email</label>
                        <input type="email" id="email" v-model="userDetails.email"
                                :class="{ 'bg-gray-200': !isEditing, 'bg-white': isEditing }"
                               class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-200"
                               :disabled="!isEditing">
                    </div>
                    <div class="flex items-center justify-between">
                        <button v-if="!isEditing" class="w-20 bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="edit">
                            Edit
                        </button>
                        <button v-else class="w-20 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Save
                        </button>
                        <!-- change password button-->
                        <button class="w-35 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="onNewPassword">
                            New Password
                        </button>
                        <button class="w-20 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="onDelete">
                            Delete
                        </button>            
                    </div>
                </form>
            </div>
           
        </div>
    <!-- </div> -->
    <PopUp v-if="isNewPassword" @close="isNewPassword = false" />
</template>
<script>
import PopUp from "@/components/PopUp.vue";
export default {
    components: {
        PopUp,
    },
    name: 'UserDetails',
    data() {
        return {
            isEditing: false,
            isNewPassword: false,
            userDetails: {
                name: 'John',
                surname: 'Doe',
                email: 'john.doe@example.com',
                password: '******', // You may want to keep this field empty or obscured
            },
        };
    },
    methods: {
        edit() {
            this.isEditing = true;
        },
        onSubmit() {
            // check if it empty
            if (this.userDetails.name === '' || this.userDetails.surname === '' || this.userDetails.email === '') {
                alert('Please fill in all fields');
                return;
            }
            this.isEditing = false;
            // Handle save logic here
        },
        onDelete() {
            console.log('Delete user');
        },
        onNewPassword() {
            // Show the modal
            console.log('New Password');
            this.isNewPassword = true;
        },
    }
};
</script>

<style scoped>
/* Your existing styles... */
</style>
