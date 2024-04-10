<template>
  <div class="w-screen h-screen bg-gray-200 p-10 flex justify-center align-middle flex-col">
      <div v-if="feedbackFormVisible" class="fixed inset-0 z-40 bg-gray-800 opacity-50 transition-opacity"> </div>
      <transition>
        <div v-if="feedbackFormVisible" class="box-border gap-6 h-min-56 flex flex-col justify-center align-middle z-50 w-1/2 h-fit bg-white rounded-xl shadow-xl fixed bottom-2 inset-0 m-auto">
          <div class="flex flex-row bg-ut-green rounded-t-xl px-2 ">
          <div class="text-2xl align-middle  w-full text-center text-white">New feedback</div>
          <el-icon @click="feedbackFormVisible = false" class="hover:cursor-pointer self-end my-auto ">
            <svg class="text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg>
          </el-icon>
          </div>
          <div class="p-3 w-full flex flex-col gap-6">
            <input placeholder="Write a feedback.." v-model="feedback" class="w-full rounded-lg p-1 border" />
            <button class="self-end rounded-lg w-fit bg-ut-green text-white hover:cursor-pointer px-2 py-1" @click="sendFeedback">Send</button>
          </div>
        </div>
      </transition>

    <div class="flex flex-row w-full justify-between align-middle">
      <div class="my-auto h-fit flex hover:cursor-pointer" @click="this.$router.push({ path: 'course', query: {id: courseId} })">
        <el-icon :size="32" class="m-auto w-8">
          <ArrowLeft />
        </el-icon>
        <div class="text-3xl"> Course</div> </div>
      <div v-if="exercises.length !== 0" @click="showExercises = !showExercises" class="w-1/4 border flex flex-row justify-between p-4 bg-white rounded-full relative">
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
      <div class="h-4/5 flex flex-row m-auto w-full ">
        <div class="rounded-3xl custom-scrollbar overflow-hidden h-full flex w-2/3 outline outline-gray-400 outline-2  bg-white m-auto relative flex-col">
        <div class="overflow-y-scroll custom-scrollbar h-full">
          <Message v-if="!!first_question.question" :description="first_question.question" />
          <template v-for="(question, index) in questions" :key="index">
            <Answer :answer="answers[index].option" />
            <Message :description="question.question" />
          </template>
    </div>
        </div>
          <div class="m-auto w-1/3">
          <div class="md:flex-col lg:flex-row flex justify-between">
          <div @click="previous"  class="gap-4 md:text-lg lg:text-2xl flex justify-center flex-row w-full hover:bg-ut-gold outline outline-ut-gold outline-2 p-3 m-3 box-border rounded-xl bg-ut-white hover:text-white text-ut-gold hover:cursor-pointer text-center">
            <svg class="w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M572.235 205.282v600.365a30.118 30.118 0 1 1-60.235 0V205.282L292.382 438.633a28.913 28.913 0 0 1-42.646 0 33.43 33.43 0 0 1 0-45.236l271.058-288.045a28.913 28.913 0 0 1 42.647 0L834.5 393.397a33.43 33.43 0 0 1 0 45.176 28.913 28.913 0 0 1-42.647 0l-219.618-233.23z"></path></svg>
            <div class="font-bold">Previous</div>
          </div>
          <div @click="feedbackFormVisible = true" class="gap-4 md:text-lg lg:text-2xl flex justify-center flex-row w-full hover:bg-ut-green outline outline-ut-green outline-2 p-3 m-3 box-border rounded-xl bg-ut-white hover:text-white text-ut-green hover:cursor-pointer text-center">
            <svg class="w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="m512 747.84 228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72zM313.6 924.48a70.4 70.4 0 0 1-102.144-74.24l37.888-220.928L88.96 472.96A70.4 70.4 0 0 1 128 352.896l221.76-32.256 99.2-200.96a70.4 70.4 0 0 1 126.208 0l99.2 200.96 221.824 32.256a70.4 70.4 0 0 1 39.04 120.064L774.72 629.376l37.888 220.928a70.4 70.4 0 0 1-102.144 74.24L512 820.096l-198.4 104.32z"></path></svg>
            <div class="font-bold">Feedback</div>
          </div>
          </div>
          <div v-for="option in options" @click="pickAnswer(option)" :key="option.next_hint" class="text-lg w-full bg-white outline outline-ut-blue outline-2 p-3 m-3 box-border rounded-xl hover:bg-ut-blue text-ut-blue hover:text-white hover:cursor-pointer">{{option.option}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Message from "@/components/Messsage.vue"
import exercisesService from "@/services/exercisesService.js";
import {ElMessage} from "element-plus";
import feedbackService from "@/services/feedbackService.js";
export default {
  data() {
    return {
      options: [],
      exercises: [],
      showExercises: false,
      courseId: null,
      assignmentId: null,
      exerciseId: null,
      feedbackFormVisible: false,
      feedback: '',
      first_question: {
        question: '',
        id: null
      },
      questions: [],
      answers: [],
      hints: null
    }
  },
  async created() {
    this.refresh()
  },
  methods: {
    async refresh() {
      this.courseId = this.$route.query.courseId;
      this.assignmentId = this.$route.query.assignmentId;
      this.exerciseId = this.$route.query.exerciseId;

      this.first_question = {
        question: null,
        id: null
      }
      this.questions = []
      this.answers = []
      this.options = []

      this.getHints()
      this.getExercises()

    },
    async getHints() {
      try {
        const res = await exercisesService.getTreeStructure(this.courseId, this.assignmentId, this.exerciseId)
        this.hints = res.data.data.hint_nodes
        console.log(this.hints)
        if(this.hints.length === 0) return


        this.first_question = {
          question: this.hints[0].name,
          id: this.hints[0].id
        }
        for(let option of this.hints[0].outgoing_edges) {
          const opt = {
            option: option.option,
            next_hint: option.destination_hint_node_id
          }
          this.options.push(opt)
        }


      } catch (err) {
        console.log(err)
        ElMessage({
          message: err.message,
          type: 'fail',
        })
      }
    },
    async pickAnswer(option) {
      const nextQuestion = this.hints.find(hint => hint.id === option.next_hint)


      this.answers.push(option)
      this.options = []
      for(let option of nextQuestion.outgoing_edges) {
        const opt = {
          option: option.option,
          next_hint: option.destination_hint_node_id
        }
        this.options.push(opt)
      }
      this.questions.push({
            question: nextQuestion.name,
            id: nextQuestion.id
          })
    },
    async getExercises() {
      try {
        const res = await exercisesService.getExercises(this.courseId, this.assignmentId)
        this.exercises = res.data.data

        // const exercise = this.exercises.find(exercise => exercise.id === parseInt(this.exerciseId)).identifier


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
    },
    async previous() {
      this.questions.pop()
      this.answers.pop()
      this.options = []
      const lastQuestion = this.questions[this.questions.length - 1] || this.first_question

      for(let option of (this.hints.find(hint => hint.id === lastQuestion.id)).outgoing_edges) {
        const opt = {
          option: option.option,
          next_hint: option.destination_hint_node_id
        }
        this.options.push(opt)
      }
    }
  },
  watch: {
    $route() {
        this.refresh();
    },
  },
  components: {
    Message
  },
}

</script>

<style scoped>
svg {
  @apply transition-transform duration-200;
}
/* Custom scrollbar styling */
.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background-color: transparent; /* Set track background color to transparent */
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #888; /* Grey */
  border-radius: 3rem;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555; /* Dark grey */
}
</style>