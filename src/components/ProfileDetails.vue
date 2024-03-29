<template>
    <div class="flex justify-center">
        <div class="mt-4 bg-white rounded-xl shadow-md overflow-hidden mb-2
                    md:max-w-2xl transition duration-500 ease-in-out transform
                    hover:scale-105 hover:shadow-glow border-ut-pink
                    transform-gpu origin-bottom
                    ">
            <div class="flex flex-col justify-between h-full">
                <div class="p-5 bg-white">
                    <!-- User Info -->
                    <div class="flex justify-between">
                        <div class="w-1/2 pr-4">
                            <div class="mb-2">
                                <label class="font-bold text-xl">Name</label>
                                <div>{{ userDetails.name }}</div>
                            </div>
                            <div class="mb-2">
                                <label class="font-bold text-xl">Surname</label>
                                <div>{{ userDetails.surname }}</div>
                            </div>
                            <div class="mb-2">
                                <label class="font-bold text-xl">Email</label>
                                <div>{{ userDetails.email }}</div>
                            </div>
                        </div>
            
                        <!-- Courses -->
                        <div class="w-1/2 pl-4">
                            <label class="font-bold text-xl">Courses</label>
                            <div v-for="course in userDetails.courses" :key="course">
                                <div class="flex justify-between mb-2">
                                    <p class="block mt-1 whitespace-nowrap mr-4">{{ course }}</p>
                                    <p class="text-gray-500 italic text-xs">{{ userDetails.courseCodes[course] }}</p>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
                <!-- Buttons at the bottom -->
                <div class="bg-white mb-4">
                    <div class="flex justify-around">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="newPassword">
                            New Password
                        </button>
                        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="edit">
                            Edit
                        </button>
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="delete">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
  <script>
  export default {
    name: 'UserDetails',
    data() {
        return {
         userDetails: {
            name: 'Jane',
            surname: 'Doe',
            email: 'john.doe@example.com',
            courses: ['Computer Science', 'Biology', 'Artificial Intelligence', 'Mathematics', 'Physics'],
            courseCodes: {
                'Computer Science': 'CS101',
                'Biology': 'BIO101',
                'Artificial Intelligence': 'AI101',
                'Mathematics': 'MATH101',
                'Physics': 'PHY101'
                    }
            }
        }
    }
}

  </script>
  
  <style scoped>

  .hover\:shadow-glow:hover {
  box-shadow: 0 0 5px , 0 0 5px #cf0072, 0 0 5px #cf0072, 0 0 5px #cf0072;
}
/*   
 .user-info, .courses {
    width: 50%;
  } 
  
  .field label {
    font-weight: bold;
  }
 .field div {
    margin-bottom: 0.5em;
  } 
  
 .courses ul {
    list-style: none;
    padding: 0;
  }
  
  .courses label {
    font-weight: bold;
  }
  
  .courses li:not(:last-child) {
    margin-bottom: 0.5em;
  }
  */
  </style>
