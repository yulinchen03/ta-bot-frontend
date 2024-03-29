<template>
  <div @click="emitClickEvent" class="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-102 hover:shadow-glow border-ut-pink">
    <div class="hover:shadow-lg">
      <img class="h-36 w-full object-cover" src="https://upload.wikimedia.org/wikipedia/commons/5/51/Computer_Science_Word_Cloud.png">
    </div>
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-ut-pink font-semibold">{{ courseTitle }}</div>
      <p class="block mt-1 text-lg leading-tight font-medium text-black">{{ code }}</p>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.loadData()
  },
  data() {
    return {
      courseTitle: 'Service-Oriented Architecture Web Serv. (2023-2A)',
      code: 'Luis Ferreira Pires',
      join_code: '',
    }
  },
  methods: {
    loadData() {
      this.courseTitle = this.courseData['title']
      this.code = this.courseData['code']
      this.join_code = this.courseData['join_code']
    },
    emitClickEvent() {
      this.$emit('courseSelected');
    }
  },
  props: {
    courseData: Object
  },
}
</script>


<style scoped>
.hover\:shadow-glow:hover {
  box-shadow: 0 0 5px , 0 0 5px #cf0072, 0 0 5px #cf0072, 0 0 5px #cf0072;
}
</style>