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
                </template>
              </el-table-column>
              <el-table-column v-else label="Open">
                <template v-slot:default="scope">
                  <el-button size="large" type="Default" @click="view(item, scope.$index)">
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
// Importing necessary dependencies and services
import { ElMessage } from 'element-plus'; // Element Plus for displaying messages
import courseService from '@/services/courseService.js'; // Service for course-related operations
import exercisesService from '@/services/exercisesService.js'; // Service for exercise-related operations
import assignmentsService from '@/services/assignmentsService.js'; // Service for assignment-related operations
import { mapStores } from 'pinia'; // Pinia for state management
import useUserStore from '@/stores/user.js'; // Store for user-related data
import errorHandler from '@/utils/errorHandler.js'; // Utility function for error handling

export default {
  // Using computed properties from the user store
  computed: {
    ...mapStores(useUserStore)
  },
  // Initialization on component creation
  created() {
    // Fetch initial data when the component is created
    this.fetchData();
    // Determine if the user is a teacher or admin
    this.isTeacher = this.userStore.user.role === 'teacher' || this.userStore.user.role === 'admin';
  },
  // Data properties for the component
  data() {
    return {
      // Initializing data properties
      isTeacher: null, // Flag to indicate if the user is a teacher or admin
      courseid: -1, // ID of the course
      pageTitle: '', // Title of the page
      instructor: '', // Name of the instructor
      assignmentCount: 0, // Count of assignments
      exerciseCount: 0, // Count of exercises
      todo: 0, // Count of incomplete exercises
      activeIndex: null, // Index of the active item
      assignments: [], // Array to store assignments
      invite_code: null, // Invite code for the course
      assignmentForm: { // Form for creating assignments
        name: '', // Name of the assignment
        number_of_exercises: null // Number of exercises in the assignment
      },
      dialogFormVisible: false, // Flag to control visibility of dialog form
      editCourseName: false // Flag to indicate if course name is being edited
    };
  },
  // Watchers to react to route changes
  watch: {
    $route: 'fetchData' // Watch for route changes and trigger data fetching
  },
  // Methods for the component
  methods: {
    // Method to fetch data for the component
    async fetchData() {
      // Get the course ID from the route query parameters
      this.courseid = this.$route.query.id;
      // Reset exercise count
      this.exerciseCount = 0;

      // Get course details from the course service
      const course = (await courseService.getCourse(this.courseid)).data.data;

      // Populate data properties with course details
      this.invite_code = course.access_id;
      this.instructor = course.teacher;

      try {
        const assignmentsArray = [];
        // Get assignments with associated exercises from the assignments service
        const res = await assignmentsService.getAssignmentsWithExercises(this.courseid);
        const assignments = res.data.data;

        // Process assignments and exercises
        for (let assignment of assignments) {
          const exercises = assignment.exercises;

          // Map exercises to a more structured format
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
        // Handle errors gracefully
        errorHandler(err);
      }

      // Update page title and counts
      this.pageTitle = course.name;
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
    },
    // Method to delete an assignment
    async deleteAssignment(assignment_id) {
      try {
        // Call assignments service to delete the assignment
        await assignmentsService.deleteAssignment(this.courseid, assignment_id);
        // Display success message
        ElMessage({
          message: 'Successfuly deleted',
          type: 'success'
        });
      } catch (err) {
        // Handle errors gracefully
        errorHandler(err);
      }
      // Refresh data after deletion
      await this.fetchData();
    },

    // Method to create an exercise
    async createExercise(assignment, assignmentIntheList) {
      try {
        // Call exercises service to add exercises to an assignment
        await exercisesService.addExercises(this.courseid, assignment.id, {
          identifier: 'Exercise ' + (this.assignments[assignmentIntheList].exercises.length + 1)
        });

        // Display success message
        ElMessage({
          message: 'Exercise successfully created.',
          type: 'success'
        });
      } catch (err) {
        // Handle errors gracefully
        errorHandler(err);
      }
      // Refresh data after creation
      this.fetchData();
    },

    // Method to toggle active index
    toggle(i) {
      this.activeIndex = this.activeIndex === i ? null : i;
    },

    // Method to create an assignment
    async createAssignment() {
      try {
        // Call assignments service to add an assignment
        const assignment = await assignmentsService.addAssignment(this.courseid, {
          name: this.assignmentForm.name
        });

        // Add exercises to the assignment
        for (let i = 0; i < this.assignmentForm.number_of_exercises; i++) {
          await exercisesService.addExercises(this.courseid, assignment.data.data.id, {
            identifier: 'Exercise ' + (i + 1)
          });
        }

        // Display success message
        ElMessage({
          message: 'Assignment successfully created.',
          type: 'success'
        });
      } catch (err) {
        // Handle errors gracefully
        errorHandler(err);
      }
      // Reset form and refresh data after creation
      this.dialogFormVisible = false;
      this.assignmentForm.name = '';
      this.assignmentForm.number_of_exercises = 0;
      await this.fetchData();
    },

    // Method to publish/unpublish an exercise
    async publish(exercise, assignment) {
      try {
        // Call exercises service to change exercise publication status
        await exercisesService.changeExercises(this.courseid, assignment.id, exercise.id, {
          is_published: exercise.completed
        });
        // Display success message
        ElMessage({
          message: exercise.completed ? 'Exercise published' : 'Exercise unpublished',
          type: 'success'
        });
      } catch (err) {
        // Handle errors gracefully
        errorHandler(err);
      }
      // Refresh data after change
      await this.fetchData();
    },

    // Method to handle deletion of an exercise
    async handleDelete(exercise, assignment) {
      try {
        // Call exercises service to delete an exercise
        await exercisesService.deleteExercises(this.courseid, assignment.id, exercise.id);
        // Display success message
        ElMessage({
          message: 'Exercise successfully deleted',
          type: 'success'
        });
      } catch (err) {
        // Handle errors gracefully
        errorHandler(err);
      }
      // Refresh data after deletion
      await this.fetchData();
    },

    // Method to copy invite code to clipboard
    copy() {
      navigator.clipboard.writeText(this.invite_code);
      // Display success message
      ElMessage({
        message: 'Invite code copied to clipboard',
        type: 'success'
      });
    },

    // Method to view an exercise
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

    // Method to edit an exercise
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

    // Method to rename a course
    async renameCourse(courseId, body) {
      try {
        // Call course service to rename the course
        await courseService.changeCourse(courseId, { name: body });
        // Display success message
        ElMessage({
          showClose: true,
          message: 'Course renamed successfully',
          type: 'success'
        });
        // Toggle edit mode for course name
        this.editCourseName = !this.editCourseName;
      } catch (err) {
        // Handle errors gracefully
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
