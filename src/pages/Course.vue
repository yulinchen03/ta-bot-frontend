<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <!-- sidebar -->
    <Sidebar></Sidebar>
    <!--  main -->
    <div class="grid grid-cols-1 relative h-full w-full overflow-y-auto">
      <div
        class="relative grid grid-cols-1 overflow-visible bg-cover bg-no-repeat h-[25vh] w-full"
        style="background-image: url('https://cdn.rit.edu/images/program/2020-06/ai-banner.jpg')"
      >
        <div class="grid grid-cols-1">
          <div class="flex items-center">
            <Header
              v-if="!editCourseName"
              :title="pageTitle"
              class="text-gray-200 italic font-semibold"
            ></Header>
            <el-button
              v-if="isTeacher & !editCourseName"
              @click="editCourseName = !editCourseName"
              class="custom-button"
              circle
              ><el-icon><Edit /></el-icon
            ></el-button>
          </div>
          <div v-if="isTeacher & editCourseName" class="flex items-center h-[80px]">
            <el-input
              v-if="editCourseName"
              placeholder="Course name"
              v-model="pageTitle"
              style="width: 30vw"
              class="pl-10 pr-5"
            ></el-input>
            <el-button
              v-if="isTeacher & editCourseName"
              @click="renameCourse(courseid, pageTitle)"
              class="custom-button"
              round
              >Save</el-button
            >
          </div>
          <div class="text-gray-200 xl:text-lg 2xl:text-2xl font-arial px-10 font-semibold">
            <h2 class="my-1 text-white">Instructor: {{ instructor }}</h2>
          </div>
        </div>
        <div class="text-gray-200 xl:text-lg 2xl:text-2xl font-arial px-10 font-semibold">
          <div class="flex items-center mb-1">
            <h2 class="mr-3">Invite code: {{ invite_code }}</h2>
            <el-alert
              v-if="showCopySuccess"
              title="Success alert"
              type="success"
              show-icon
              @close="showCopySuccess = false"
            />
            <el-button :size="'default'" round class="custom-button" @click="copy()" :plain="true"
              ><el-icon class="mr-2"><CopyDocument /></el-icon>Copy</el-button
            >
          </div>
        </div>
        <div
          class="flex space-x-10 justify-between items-center text-gray-200 font-arial px-10 font-semibold xl:text-lg 2xl:text-2xl"
        >
          <div class="flex space-x-10">
            <div class="text-center">
              <h2>Assignments: {{ assignmentCount }}</h2>
            </div>
            <div class="text-center">
              <h2>Total Exercises: {{ exerciseCount }}</h2>
            </div>
            <div v-if="isTeacher" class="text-center">
              <h2>Unpublished Exercises: {{ todo }}</h2>
            </div>
          </div>
          <!--          Create assignment modal-->
          <el-button
            v-if="isTeacher"
            size="large"
            class="custom-button"
            @click="dialogFormVisible = true"
            ><el-icon class="mr-2" :size="20"><Plus /></el-icon>Create Assignment</el-button
          >
          <!--          -->
        </div>
      </div>
      <el-dialog v-model="dialogFormVisible" title="Create Assignment" width="500">
        <el-form :model="assignmentForm">
          <el-form-item label="Assignment Name:">
            <el-input v-model="assignmentForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Number of Exercises:">
            <el-input-number v-model="assignmentForm.number_of_exercises" :min="1" :max="20" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer flex items-center justify-center">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button class="custom-button" @click="createAssignment"> Confirm </el-button>
          </div>
        </template>
      </el-dialog>
      <div class="mx-10 py-5 h-[calc(100vh-150px)]">
        <div
          v-for="(item, i) in assignments"
          :key="i"
          class="bg-black border-ut-pink border-l-4 border-r-4 rounded-lg my-5 font-arial"
        >
          <div class="flex flex-row justify-around align-middle relative">
            <button @click="toggle(i)" class="w-full px-8 py-6 flex items-center">
              <svg
                :class="{ 'transform rotate-180': activeIndex === i }"
                class="fill-ut-pink shrink-0"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                viewBox="0 0 256 256"
                id="Flat"
              >
                <path
                  d="M128,188a11.96187,11.96187,0,0,1-8.48535-3.51465l-80-80a12.0001,12.0001,0,0,1,16.9707-16.9707L128,159.0293l71.51465-71.51465a12.0001,12.0001,0,0,1,16.9707,16.9707l-80,80A11.96187,11.96187,0,0,1,128,188Z"
                />
              </svg>
              <h2 class="text-ut-pink font-semibold text-2xl absolute left-20">{{ item.name }}</h2>
              <h2 class="text-white italic text-sm">(Exercises: {{ item.exercises.length }})</h2>
            </button>
            <div v-if="isTeacher" class="flex items-center pr-3">
              <el-button class="delete-button" @click="deleteAssignment(item.id)"
                ><el-icon class="mr-2"><Delete /></el-icon>Delete Assignment</el-button
              >\
            </div>
          </div>
          <div
            v-show="activeIndex === i"
            class="bg-white px-8 py-6 grid grid-cols-1 relative h-full w-full overflow-auto"
          >
            <el-button v-if="isTeacher" class="add_exercise-button">
              <div
                @click="createExercise(item, i)"
                class="absolute inset-x-0 flex justify-center items-center"
              >
                <el-icon class="mr-4"><Plus /></el-icon>
                <b>Add Exercise</b>
              </div>
            </el-button>
            <el-table :data="item.exercises">
              <el-table-column v-if="isTeacher" label="Complete">
                <template v-slot:default="scope">
                  <el-icon v-if="scope.row.completed" color="green" size="large">
                    <Check />
                  </el-icon>
                  <el-icon v-else color="red" size="large">
                    <Close />
                  </el-icon>
                </template>
              </el-table-column>
              <el-table-column prop="exercise" label="Exercise"></el-table-column>
              <el-table-column v-if="isTeacher" label="Open">
                <template v-slot:default="scope">
                  <el-button size="large" type="Default" @click="edit(scope.$index, i)">
                    <el-icon class="mr-2">
                      <Edit />
                    </el-icon>
                    View / Edit
                  </el-button>
                  <!--                    TODO GET THIS TO WORK-->
                </template>
              </el-table-column>
              <el-table-column v-else label="Open">
                <template v-slot:default="scope">
                  <el-button size="large" type="Default" @click="view(item, scope.$index)">
                    <!-- TODO GET THIS TO WORK -->
                    <el-icon class="mr-2">
                      <View />
                    </el-icon>
                    View
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column v-if="isTeacher" prop="completed" label="Publish">
                <template #default="scope">
                  <el-switch
                    @change="publish(scope.row, item)"
                    v-model="scope.row.completed"
                    class="ml-2"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  />
                </template>
              </el-table-column>
              <el-table-column v-if="isTeacher" label="Remove">
                <template #default="scope">
                  <el-button size="large" type="danger" @click="handleDelete(scope.row, item)"
                    ><el-icon><Delete /></el-icon
                  ></el-button>
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
import { ElMessage } from 'element-plus';
import courseService from '@/services/courseService.js';
import exercisesService from '@/services/exercisesService.js';
import assignmentsService from '@/services/assignmentsService.js';
import { mapStores } from 'pinia';
import useUserStore from '@/stores/user.js';
import errorHandler from '@/utils/errorHandler.js';

export default {
  computed: {
    ...mapStores(useUserStore)
  },
  created() {
    this.fetchData();
    this.isTeacher = this.userStore.user.role === 'teacher' || this.userStore.user.role === 'admin';
  },
  data() {
    return {
      isTeacher: null,
      courseid: -1,
      pageTitle: '',
      instructor: '',
      assignmentCount: 0,
      exerciseCount: 0,
      todo: 0,
      activeIndex: null,
      assignments: [],
      invite_code: null,
      assignmentForm: {
        name: '',
        number_of_exercises: null
      },
      dialogFormVisible: false,
      editCourseName: false
    };
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    async fetchData() {
      this.courseid = this.$route.query.id;
      this.exerciseCount = 0;

      const course = (await courseService.getCourse(this.courseid)).data.data;
      console.log(course);
      this.invite_code = course.access_id;
      this.instructor = course.teacher;

      try {
        const assignmentsArray = [];
        const res = await assignmentsService.getAssignmentsWithExercises(this.courseid);
        const assignments = res.data.data;

        for (let assignment of assignments) {
          const exercises = assignment.exercises;

          assignmentsArray.push({
            id: assignment.id,
            name: assignment.name,
            exercises: exercises.map((exercise) => {
              return {
                id: exercise.id,
                exercise: exercise.identifier,
                completed: exercise.is_published
              };
            })
          });
          this.assignments = assignmentsArray;
        }
      } catch (err) {
        errorHandler(err);
      }

      this.pageTitle = course.name;
      // this.instructor = this.userStore.username;
      // TODO add instructor
      this.assignmentCount = this.assignments.length;
      this.exerciseCount = 0;
      this.todo = 0;
      for (let i = 0; i < this.assignmentCount; i++) {
        let exercises = this.assignments[i].exercises;
        this.exerciseCount += exercises.length;
        for (let i = 0; i < exercises.length; i++) {
          if (!exercises[i].completed) {
            this.todo += 1;
          }
        }
      }
      // todo Query your database with courseId
    },
    async deleteAssignment(assignment_id) {
      try {
        await assignmentsService.deleteAssignment(this.courseid, assignment_id);
        ElMessage({
          message: 'Successfuly deleted',
          type: 'success'
        });
      } catch (err) {
        errorHandler(err);
      }
      await this.fetchData();
    },

    async createExercise(assignment, assignmentIntheList) {
      try {
        await exercisesService.addExercises(this.courseid, assignment.id, {
          identifier: 'Exercise ' + (this.assignments[assignmentIntheList].exercises.length + 1)
        });

        ElMessage({
          message: 'Exercise successfully created.',
          type: 'success'
        });
      } catch (err) {
        errorHandler(err);
      }
      this.fetchData();
    },

    toggle(i) {
      this.activeIndex = this.activeIndex === i ? null : i;
    },

    async createAssignment() {
      try {
        const assignment = await assignmentsService.addAssignment(this.courseid, {
          name: this.assignmentForm.name
        });

        for (let i = 0; i < this.assignmentForm.number_of_exercises; i++) {
          await exercisesService.addExercises(this.courseid, assignment.data.data.id, {
            identifier: 'Exercise ' + (i + 1)
          });
        }

        ElMessage({
          message: 'Assignment successfully created.',
          type: 'success'
        });
      } catch (err) {
        errorHandler(err);
      }
      this.dialogFormVisible = false;
      this.assignmentForm.name = '';
      this.assignmentForm.number_of_exercises = 0;
      await this.fetchData();
    },

    async publish(exercise, assignment) {
      try {
        await exercisesService.changeExercises(this.courseid, assignment.id, exercise.id, {
          is_published: exercise.completed
        });
        ElMessage({
          message: exercise.completed ? 'Exercise published' : 'Exercise unpublished',
          type: 'success'
        });
      } catch (err) {
        errorHandler(err);
      }
      await this.fetchData();
    },

    async handleDelete(exercise, assignment) {
      try {
        await exercisesService.deleteExercises(this.courseid, assignment.id, exercise.id);
        ElMessage({
          message: 'Exercise successfully deleted',
          type: 'success'
        });
      } catch (err) {
        errorHandler(err);
      }
      await this.fetchData();
    },

    copy() {
      navigator.clipboard.writeText(this.invite_code);
      ElMessage({
        message: 'Invite code copied to clipboard',
        type: 'success'
      });
    },
    view(assignment, exercise_idx) {
      this.$router.push({
        path: 'bot',
        query: {
          courseId: this.courseid,
          assignmentId: assignment.id,
          exerciseId: assignment.exercises[parseInt(exercise_idx)].id
        }
      });
    },
    edit(exercise_idx, assignment_idx) {
      this.$router.push({
        path: 'editor',
        query: {
          c: this.courseid,
          a: this.assignments[assignment_idx].id,
          e: this.assignments[assignment_idx].exercises[exercise_idx].id
        }
      });
    },
    async renameCourse(courseId, body) {
      try {
        await courseService.changeCourse(courseId, { name: body });
        ElMessage({
          showClose: true,
          message: 'Course renamed successfully',
          type: 'success'
        });
        this.editCourseName = !this.editCourseName;
      } catch (err) {
        errorHandler(err);
      }
    }
  }
};
</script>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';
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

.delete-button {
  background-color: black; /* This is for pink background */
  color: white; /* This is for white text */
  border-color: black;
  font-weight: bold;
}

.delete-button:hover {
  background-color: red;
  color: white;
  border-color: red;
  font-weight: bold;
}

.add_exercise-button {
  font-weight: bold;
}

.add_exercise-button:hover {
  border-color: #cf0072;
  color: black;
  background-color: white;
}

:deep(.el-form-item__label) {
  color: black !important;
}
</style>
