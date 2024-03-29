<template>
    <div class="flex justify-center">
        <!-- <div class="mt-4 bg-white rounded-xl shadow-md overflow-hidden mb-2
                    md:max-w-2xl transition duration-500 ease-in-out transform
                    hover:scale-105 hover:shadow-glow border-ut-pink
                    transform-gpu origin-bottom
                    "> -->
            <!-- Existing content... -->

            <!-- Form Section in a separate box -->
            <div class="px-5 py-4 bg-gray-200 mt-5">
                <form @submit.prevent="onSubmit">
                    <div class="mb-4">
                        <label for="name" class="block text-black text-lg font-bold mb-2">Name</label>
                        <input type="text" id="name" v-model="userDetails.name" 
                               class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-200"
                               :disabled="!isEditing">
                    </div>
                    <div class="mb-4">
                        <label for="surname" class="block text-black text-lg font-bold mb-2">Surname</label>
                        <input type="text" id="surname" v-model="userDetails.surname"
                               class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-200"
                               :disabled="!isEditing">
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-black text-lg font-bold mb-2">Email</label>
                        <input type="email" id="email" v-model="userDetails.email"
                               class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-200"
                               :disabled="!isEditing">
                    </div>
                    <div class="mb-6">
                        <label for="password" class="block text-black text-lg font-bold mb-2">Password</label>
                        <input type="password" id="password" v-model="userDetails.password"
                               class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight bg-gray-100"
                               :disabled="!isEditing">
                    </div>
                    <div class="flex items-center justify-between">
                        <button v-if="!isEditing" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="edit">
                            Edit
                        </button>
                        <button v-else class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Save
                        </button>
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="onDelete">
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    <!-- </div> -->
</template>
<script>
export default {
    name: 'UserDetails',
    data() {
        return {
            isEditing: false,
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
            this.isEditing = false;
            // Handle save logic here
        },
        onDelete() {
            // Handle delete action
        },
    }
};
</script>

<style scoped>
/* Your existing styles... */
</style>
