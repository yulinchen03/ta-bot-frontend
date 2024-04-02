<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <!-- sidebar -->
    <Sidebar></Sidebar>
    <!--  main -->
    <div class="grid grid-cols-1 relative h-full w-full overflow-y-auto">
      <div class="relative grid grid-cols-1 overflow-visible bg-cover bg-no-repeat h-[25vh] w-full"
           style="background-image: url('https://cdn.rit.edu/images/program/2020-06/ai-banner.jpg');">
        <Header :title="pageTitle" class="text-gray-200 italic font-semibold">
        </Header>
        <div class="text-gray-200 xl:text-lg 2xl:text-2xl font-arial px-10 font-semibold">
          <div class="flex items-center mb-3">
            <h2 class="mr-3">Invite code: {{ invite_code }}</h2>
            <el-alert v-if="showCopySuccess" title="Success alert" type="success" show-icon @close="showCopySuccess=false"/>
            <el-button :size="'small'" round class="custom-button" @click="copy()" :plain="true">Copy</el-button>
          </div>
          <h2>Instructor: {{ instructor }}</h2>
        </div>
        <div class="flex space-x-10 justify-between items-center text-gray-200 font-arial px-10 font-semibold xl:text-lg 2xl:text-2xl">
          <div class="flex space-x-10">
            <div class="text-center">
              <h2>Assignments: {{ assignmentCount }}</h2>
            </div>
            <div class="text-center">
              <h2>Total Exercises: {{ exerciseCount }}</h2>
            </div>
            <div class="text-center">
              <h2>Unpublished Exercises: {{ todo }}</h2>
            </div>
          </div>
<!--          Create assignment modal-->
          <el-button size="large" class="custom-button" @click="dialogFormVisible = true"><el-icon class="mr-2" :size="20"><Plus /></el-icon>Create Assignment</el-button>
<!--          -->
        </div>
      </div>
      <el-dialog v-model="dialogFormVisible" title="Create Assignment" width="500">
        <el-form :model="assignmentForm">
          <el-form-item label="Assignment Name:">
            <el-input v-model="assignmentForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Number of Exercises">
            <el-input-number v-model="assignmentForm.number_of_exercises" :min="1" :max="99" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer flex items-center justify-center">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button class="custom-button" @click="createAssignment">
              Confirm
            </el-button>
          </div>
        </template>
      </el-dialog>
      <div class="mx-10 py-5 h-[calc(100vh-150px)]">
        <div v-for="(item, i) in assignments" :key="i"
             class="bg-black border-ut-pink border-l-4 border-r-4 rounded-lg my-5 font-arial">
          <button @click="toggle(i)" class="w-full px-8 py-6">
            <svg :class="{'transform rotate-180': activeIndex === i}" class="fill-ut-pink shrink-0" width="16"
                 height="16" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 256 256" id="Flat">
              <path d="M128,188a11.96187,11.96187,0,0,1-8.48535-3.51465l-80-80a12.0001,12.0001,0,0,1,16.9707-16.9707L128,159.0293l71.51465-71.51465a12.0001,12.0001,0,0,1,16.9707,16.9707l-80,80A11.96187,11.96187,0,0,1,128,188Z"/>
            </svg>
            <h2 class="text-ut-pink font-semibold absolute left-32">{{ item.title }}</h2>
            <h2 class="text-white font-semibold absolute right-36">Exercises: {{ item.exercises.length }}</h2>
          </button>
          <div v-show="activeIndex === i"
               class="bg-white px-8 py-6 grid grid-cols-1 relative h-full w-full overflow-auto">
            <el-button class="add_exercise-button">
              <div @click="createExercise(i)" class="absolute inset-x-0 flex justify-center items-center">
                <el-icon class="mr-4"><Plus/></el-icon>
                <b>Add Exercise</b>
              </div>
            </el-button>
            <el-table :data="item.exercises" >
              <el-table-column label="Complete">
                <template v-slot:default="scope">
                  <el-icon v-if="scope.row.completed" color="green" size="large">
                    <Check/>
                  </el-icon>
                  <el-icon v-else color="red" size="large">
                    <Close/>
                  </el-icon>
                </template>
              </el-table-column>
              <el-table-column prop="exercise" label="Question"></el-table-column>
              <el-table-column label="Open">
                <template v-slot:default="scope">
                  <el-button
                      size="large"
                      type="Default"
                      @click="edit(scope.$index, i)"
                  >
                    <el-icon class="mr-2">
                      <Edit />
                    </el-icon>
                    View / Edit
                  </el-button>
                  <!--                    TODO GET THIS TO WORK-->
                </template>
              </el-table-column>
              <el-table-column prop="completed" label="Publish">
                <template #default="scope">
                  <el-button
                      size="large"
                      type="Default"
                      @click="publish(scope.row, item)">
                    <el-icon><Promotion /></el-icon></el-button
                  >
                  <!--                    TODO GET THIS TO WORK-->
                </template>
              </el-table-column>
              <el-table-column label="Remove">
                <template #default="scope">
                  <el-button
                      size="large"
                      type="danger"
                      @click="handleDelete(scope.row, item)"
                  ><el-icon><Delete /></el-icon></el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {ElMessage} from "element-plus";
import courseService from "@/services/courseService.js";
import exercisesService from "@/services/exercisesService.js";
import assignmentsService from "@/services/assignmentsService.js";
import { mapStores } from 'pinia'
import useUserStore from '@/stores/user.js'


export default {
  created() {
    this.fetchData();
  },
  data() {
    return {
      courseid: -1,
      pageTitle: '',
      instructor: '',
      assignmentCount: 0,
      questionCount: 0,
      todo: 0,
      activeIndex: null,
      assignments: [],
      assignmentForm: {
        name: '',
        number_of_questions: ''
      },
      dialogFormVisible: false
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    async fetchData() {
      this.courseid = this.$route.query.id;
      this.assignments = []

      const course = (await courseService.getCourse(this.courseid)).data.data;

      try {
        const res = await assignmentsService.getAssignments(this.courseid);
        const assignments = res.data.data;

        for (let assignment of assignments) {
          const exercises = (await exercisesService.getExercises(this.courseid, assignment.id)).data.data;

          this.assignments.push({
            id: assignment.id,
            name: assignment.name,
            exercises: exercises.map(exercise => {
              return {
                id: exercise.id,
                exercise: exercise.identifier,
                completed: exercise.is_published
              }
            })
          })
        }

        // {
          //     title: 'Assignment 1',
          //     questions: [{question: 'Question 1', completed: false}, {
          //       question: 'Question 2',
          //       completed: false
          //     }, {question: 'Question 3', completed: false}]
          //   },


      } catch (err) {
        console.log(err)
      }



      this.pageTitle = course.name;
      // this.instructor = this.userStore.username;
      // TODO add instructor
      this.assignmentCount = this.assignments.length;
      for(let i = 0; i < this.assignmentCount; i++) {
        let exercises = this.assignments[i].exercises
        this.questionCount += exercises.length
        for(let i = 0; i < exercises.length; i++) {
          if(!exercises[i].completed){
            this.todo += 1
          }
        }
      }
      // todo Query your database with courseId
    },

    createQuestion(assignment_id) {
      this.assignments[assignment_id].questions.push({question: 'Question ' + (this.assignments[assignment_id].questions.length + 1), completed: false})
      // todo API
    },

    toggle(i) {
      this.activeIndex = this.activeIndex === i ? null : i;
    },

    async createAssignment() {
      // let questionsList = [];
      // for(let i = 1; i <= this.assignmentForm.number_of_questions; i++) {
      //   questionsList.push({question: 'Question ' + i, completed: false});
      // }
      // this.assignments.push({title: this.assignmentForm.name, questions: questionsList});
      // console.log(this.assignments)
      // this.assignmentCount += 1
      // this.questionCount += this.assignmentForm.number_of_questions
      // this.todo += this.assignmentForm.number_of_questions
      // todo replace with API call
      try {
        await assignmentsService.addAssignment(this.courseid, {name: this.assignmentForm.name})

      } catch (err) {
        //TODO handle error
        console.log(err)
      }
      this.dialogFormVisible = false;
      this.loadSuccessMessage()
      await this.fetchData()
    },

    loadSuccessMessage() {
      ElMessage({
        message: 'Assignment successfully created.',
        type: 'success',
      })
    },

    async publish(exercise, assignment) {
      try {
        console.log(assignment)
        console.log(exercise)
        console.log(!exercise.completed)
        await exercisesService.changeExercises(this.courseid, assignment.id, exercise.id, {is_published: !exercise.completed})

      } catch (err)
      {
        //TODO handle error
        console.log(err)
      }

      await this.fetchData()

    },

    async handleDelete(exercise,assignment) {
      try {
        await exercisesService.deleteExercises(this.courseid, assignment.id,  exercise.id)
      }
      catch (err) {
        //TODO handle error
        console.log(err)
      }

      await this.fetchData()
    }
  },
}
</script>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";

</script>

<style scoped>
button {
  @apply flex justify-between items-center;
}

svg {
  @apply transition-transform duration-200;
}

.custom-button {
  background-color: #cf0072; /* This is for pink background */
  color: white; /* This is for white text */
  font-weight: bold;
}

.custom-button:hover {
  background-color: white;
  color: black;
  border-color: #cf0072;
}

.add_exercise-button {
  font-weight: bold;
}

.add_exercise-button:hover {
  border-color: #cf0072;
  color: black;
  background-color: white;
}

</style>