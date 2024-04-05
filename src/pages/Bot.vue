<template>
  <div class="w-screen h-screen bg-gray-200 p-10 flex justify-center align-middle flex-col">
    <transition class="flex flex-col justify-center align-middle z-50 w-1/2 h-20 bg-white rounded-xl shadow-xl fixed bottom-2 inset-x-0 mx-auto">
      <div class="m-auto">
      <div class="text-2xl align-middle">Feedback form </div>
        <input v-model="feedback" class="w-1/2 border" />
        <button @click="sendFeedback">Submit</button>
      </div>
    </transition>
    <div class="flex flex-row w-full justify-between align-middle">
      <div class="my-auto h-fit flex hover:cursor-pointer" @click="this.$router.push({ path: 'course', query: {id: courseId} })">
        <el-icon :size="32" class="m-auto w-8">
          <ArrowLeft />
        </el-icon>
        <div class="text-3xl"> Course</div> </div>
      <div @click="showExercises = !showExercises" class="w-1/4 border flex flex-row justify-between p-4 bg-white rounded-full relative">
        <div class="text-2xl">{{this.exercises.find(exercise => exercise.id === parseInt(this.exerciseId)).identifier}}</div>
        <div @click="showExercises = !showExercises" v-if="showExercises" class="shadow-lg bg-white  z-30 text-2xl rounded-lg p-2 w-full h-max-1/4 scroll-auto absolute left-0 top-full">
          <div v-for="(exercise, index) in exercises" @click="this.$router.push({ path: '/bot', query: {courseId, assignmentId, exerciseId: exercise.id}})" :class="{ 'hover:bg-ut-blue hover:text-white hover:cursor-pointer p-2': true, 'border-b-2': index < exercises.length - 1 }">{{exercise.identifier}}</div>
        </div>
        <el-icon class="transition transform ease-in-out delay-150 hover:cursor-pointer"   :size="32">
          <svg :class="{'transform rotate-180': showExercises}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"></path></svg>
        </el-icon>
      </div>
      <div class="my-auto outline-green-500 h-fit px-5 outline text-green-500 rounded-lg text-3xl hover:cursor-pointer"> Finish </div>
    </div>

    <div class="w-full h-full flex flex-row justify-center align-middle">
      <div class="h-4/5 flex flex-row m-auto">
        <div class="h-full flex w-2/3 outline outline-gray-400 outline-2 rounded-3xl bg-white m-auto relative flex-col">
          <Messages />
          <Answer />
          <Messages />

    </div>
        <div class="m-auto w-1/3">
          <div class="flex flex-row gap-4 ">
          <div class="gap-4 text-2xl flex justify-center flex-row w-full hover:bg-ut-gold outline outline-ut-gold outline-2 p-3 m-3 box-border rounded-xl bg-ut-white hover:text-white text-ut-gold hover:cursor-pointer text-center">
            <svg class="w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M572.235 205.282v600.365a30.118 30.118 0 1 1-60.235 0V205.282L292.382 438.633a28.913 28.913 0 0 1-42.646 0 33.43 33.43 0 0 1 0-45.236l271.058-288.045a28.913 28.913 0 0 1 42.647 0L834.5 393.397a33.43 33.43 0 0 1 0 45.176 28.913 28.913 0 0 1-42.647 0l-219.618-233.23z"></path></svg>
            <div class="font-bold">Previous</div>
          </div>
          <div class="gap-4 text-2xl flex justify-center flex-row w-full hover:bg-ut-green outline outline-ut-green outline-2 p-3 m-3 box-border rounded-xl bg-ut-white hover:text-white text-ut-green hover:cursor-pointer text-center">
            <svg class="w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="m512 747.84 228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72zM313.6 924.48a70.4 70.4 0 0 1-102.144-74.24l37.888-220.928L88.96 472.96A70.4 70.4 0 0 1 128 352.896l221.76-32.256 99.2-200.96a70.4 70.4 0 0 1 126.208 0l99.2 200.96 221.824 32.256a70.4 70.4 0 0 1 39.04 120.064L774.72 629.376l37.888 220.928a70.4 70.4 0 0 1-102.144 74.24L512 820.096l-198.4 104.32z"></path></svg>
            <div class="font-bold">Feedback</div>
          </div>
          </div>
          <div v-for="option in options" class="text-lg w-full bg-white outline outline-ut-blue outline-2 p-3 m-3 box-border rounded-xl hover:bg-ut-blue text-ut-blue hover:text-white hover:cursor-pointer">{{option}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Messages from "@/components/Messsage.vue"
import exercisesService from "@/services/exercisesService.js";
import {ElMessage} from "element-plus";
import feedbackService from "@/services/feedbackService.js";
export default {
  data() {
    return {
      options: ['Yes', 'No', 'Yes, but actually no', 'No, but actually yes', 'This is a scrollable list of buttons with no background', 'I become dark when you hover me'],
      exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3', 'Exercise 4', 'Exercise 5', 'Exercise 6', 'Exercise 7', 'Exercise 8', 'Exercise 9', 'Exercise 10'],
      showExercises: false,
      courseId: null,
      assignmentId: null,
      exerciseId: null,
      feedbackFormVisible: true,
      feedback: '',
    }
  },
  created() {
    this.courseId = this.$route.query.courseId;
    this.assignmentId = this.$route.query.assignmentId;
    this.exerciseId = this.$route.query.exerciseId;

    console.log(this.courseId)
    console.log(this.assignmentId)
    console.log(this.exerciseId)

    this.getExercises()
  },
  methods: {
    async getExercises() {
      try {
        const res = await exercisesService.getExercises(this.courseId, this.assignmentId)

        this.exercises = res.data.data



        console.log(this.exercises)
        const exercise = this.exercises.find(exercise => exercise.id === parseInt(this.exerciseId)).identifier
        console.log('ex')
        console.log(exercise)

        console.log(res)


      }
      catch(err) {
        // TODO handle error
        console.log(err)
        ElMessage({
          message: err.message,
          type: 'fail',
        })
      }


    },
    async sendFeedback() {

      try {

        const res = await feedbackService.addFeedback(this.courseId, this.assignmentId, this.exerciseId, this.feedback)
        ElMessage({
          message: 'Feedback successfully sent.',
          type: 'success',
        })

        this.feedbackFormVisible = false
        this.feedback = ''

      }
      catch (err) {
        ElMessage({
          message: err.message,
          type: 'fail',
        })
      }
    }
  },
  components: {
    Messages
  },
}

</script>

<style scoped>
svg {
  @apply transition-transform duration-200;
}

</style>