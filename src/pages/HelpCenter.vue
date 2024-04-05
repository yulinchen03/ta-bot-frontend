<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <div class="w-screen flex bg-gray-200">
    <!--    sidebar -->
    <Sidebar></Sidebar>
    <!--  main -->
    <div class="grid grid-cols-1 relative h-full w-full overflow-auto">
      <div class="relative grid grid-cols-1 overflow-visible bg-cover bg-no-repeat h-[30vh] w-full mb-12"
           style="background-image: url('https://www.utwente.nl/.uc/i6483d1530102352aaf00637dc00170c187b52a95d5e50701c3dc05000080/utimg13327.jpg');">
        <Header :title="pageTitle" class="text-gray-200 font-semibold"></Header>
        <div class="w-[20px] flex justify-center items-center">
          <el-button size="large" class="custom-button absolute inset-x-0 -bottom-5 mx-auto px-4 py-2 max-w-48 font-arial"><a href = "mailto: support@ta-bot.utwente.nl">Contact Us</a>
          </el-button>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-3 mx-20 h-[100vh-100px]">
        <div @click="openHelp(topic.id)" class="m-4 h-[25vh] bg-white shadow-xl rounded-xl overflow-y-auto p-4 max-w-md md:max-w-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-102 hover:shadow-glow border-ut-pink" v-for="topic in topics" :key="topic.id">
          <div class="flex items-center mb-4">
            <el-space :size="10" spacer="|">
              <div class="bg-ut-pink text-white rounded-full w-8 h-8 flex items-center justify-center">
                <el-icon size="30"><QuestionFilled /></el-icon>
              </div>
              <h2 class="font-bold text-lg">{{topics[topic.id-1].title}}</h2>
            </el-space>
          </div>
          <el-divider />
          <p class="text-gray-700">{{topics[topic.id-1].description}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '../components/Header.vue';

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      pageTitle: 'Help',
      topics: [{
        id: 1,
        title: 'Help topic 1',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n' +
            '          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\n'
      },{
        id: 2,
        title: 'help 2',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n' +
            '          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\n'
      },{
        id: 3,
        title: 'help 3',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n' +
            '          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\n'
      },{
        id: 4,
        title: 'help 4',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n' +
            '          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\n'
      },{
        id: 5,
        title: 'help 5',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n' +
            '          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\n'
      },{
        id: 6,
        title: 'help 6',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n' +
            '          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\n'
      },
      ]
    }
  },
  methods: {
    openHelp(id) {
      this.$router.push({path: 'help', query: {id: id}});
    }
  }
}
</script>

<style scoped>
.custom-button {
  background-color: #cf0072; /* This is for pink background */
  color: white; /* This is for white text */
  border-radius: 10px;
  font-weight: bold;
}

.custom-button:hover {
  background-color: white;
  color: black;
  border-color: #cf0072;
}

.hover\:shadow-glow:hover {
  box-shadow: 0 0 5px , 0 0 5px #cf0072, 0 0 5px #cf0072, 0 0 5px #cf0072;
}
</style>