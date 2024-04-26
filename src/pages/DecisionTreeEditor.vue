<template>
  <div class="w-screen h-screen flex">
    <div class="grid grid-cols-1 relative h-full w-full overflow-y-auto">
      <div
        class="relative grid grid-cols-1 overflow-visible bg-cover bg-no-repeat h-[10vh] w-full"
        style="background-color: lightgray"
      >
        <EditorHeader
          :coursename="coursename"
          :assignmentname="assignmentname"
          :exercisename="exercisename"
          :courseId="courseid"
          :assignmentId="assignmentid"
          :exerciseId="exerciseid"
          @publish="publish(exerciseid, assignmentid)"
          @goBack="back"
        ></EditorHeader>
        <div class="grid grid-cols-2 w-full h-[80vh] lg:p-4 xl:p-6 2xl:p-8">
          <vue-tree
            style="width: 45vw; height: 90vh"
            :dataset="treeData"
            :config="treeConfig"
            linkStyle="straight"
            class="rounded-xl bg-white border-ut-pink"
            :collapse-enabled="false"
          >
            <template v-slot:node="{ node }">
              <div
                @click="updateCurrentNode(node.id)"
                :style="{ border: collapsed ? '2px solid grey' : '' }"
                :class="{
                  'tree-node': node.id !== currentNode,
                  'tree-node-highlighted': node.id === currentNode
                }"
              >
                <span style="padding: 4px 0; font-weight: bold" class="overflow-hidden">{{
                  node.name
                }}</span>
              </div>
            </template>
          </vue-tree>
          <HintNodeEditor
            @updateCurrent="updateCurrentNode"
            @updateTree="updateTree"
            v-if="loadReady"
            :courseid="courseid"
            :assignmentid="assignmentid"
            :exerciseid="exerciseid"
            :currentNode="currentNode"
            :originNode="originNode"
          ></HintNodeEditor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTree from '@ssthouse/vue3-tree-chart'; // Imports the tree chart component for Vue 3
import '@ssthouse/vue3-tree-chart/dist/vue3-tree-chart.css'; // Imports styles for the tree chart component
import editorService from '@/services/editorService.js'; // Service layer for editor-related interactions
import HintNodeEditor from '@/components/HintNodeEditor.vue'; // Component for editing hint nodes
import EditorHeader from '@/components/EditorHeader.vue'; // Header component for the editor layout
import exercisesService from '@/services/exercisesService.js'; // API services for exercise data handling
import { ElMessage } from 'element-plus'; // Notification component from Element UI
import errorHandler from '@/utils/errorHandler.js'; // Utility function for error handling

export default {
  components: {
    EditorHeader, // Registers EditorHeader component
    HintNodeEditor, // Registers HintNodeEditor component
    VueTree // Registers VueTree component for rendering tree structures
  },
  created() {
    this.initializeData(); // Initializes data when component is created
    this.getTree(false); // Fetches the initial tree structure without refresh flag
    this.getCourse(); // Fetches course details
    this.getAssignment(); // Fetches assignment details
    this.getExercise(); // Fetches exercise details
    window.addEventListener('beforeunload', this.beforeUnload); // Adds event listener to handle the browser unload event
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.beforeUnload); // Removes the unload event listener before component is destroyed
  },
  beforeRouteLeave(to, from, next) {
    // Hook called when the route that renders this component is about to change
    const answer = window.confirm('Do you really want to leave? you may have unsaved changes!');
    if (!answer) return false; // Prevents navigation if the user chooses to stay
    next(); // Continues with the routing if confirmed
  },
  data() {
    return {
      courseid: -1, // Placeholder for course ID
      assignmentid: -1, // Placeholder for assignment ID
      exerciseid: -1, // Placeholder for exercise ID
      currentNode: -1, // Tracks the current node within the tree
      originNode: -1, // Tracks the origin node of the tree
      coursename: '', // Stores the name of the course
      assignmentname: '', // Stores the name of the assignment
      exercisename: '', // Stores the name of the exercise
      hintdescription: 'Sample text for hint descriptions.', // Default hint description
      loadReady: false, // Flag to check if the tree data is ready to be rendered
      treeData: {}, // Object to store the tree data
      treeConfig: {
        nodeWidth: 120, // Width of each node in the tree
        nodeHeight: 80, // Height of each node in the tree
        levelHeight: 200 // Vertical spacing between levels of the tree
      },
      branchingCondition: '', // Stores conditions for branching logic
      enabled: true, // Flag to enable or disable UI components
      sampleDraggable: [ // Sample data for draggable components
        { name: 'vue.js 3.0', order: 1 },
        { name: 'vue.draggable', order: 2 },
        { name: 'draggable', order: 3 },
        { name: 'component', order: 4 }
      ]
    };
  },
  methods: {
    async getTree(refresh) {
      try {
        const res = await editorService.getTree(this.courseid, this.assignmentid, this.exerciseid);
        this.treeData = res.data.data; // Sets the tree data from response
        this.originNode = this.treeData.id; // Sets the origin node ID
        if (!refresh) {
          this.currentNode = this.originNode; // Updates current node if not a refresh operation
        }
        this.loadReady = true; // Marks the component as ready to load
      } catch (err) {
        errorHandler(err); // Handles errors from the API call
      }
    },
    async getCourse() {
      const res = await editorService.getCourse(this.courseid);
      this.coursename = res.data.data.name; // Sets the course name from response
    },
    async getAssignment() {
      const res = await editorService.getAssignment(this.courseid, this.assignmentid);
      this.assignmentname = res.data.data.name; // Sets the assignment name from response
    },
    async getExercise() {
      const res = await editorService.getExercise(this.courseid, this.assignmentid, this.exerciseid);
      this.exercisename = res.data.data.identifier; // Sets the exercise identifier from response
    },
    initializeData() {
      this.courseid = Number(this.$route.query.c); // Initializes course ID from route query
      this.assignmentid = Number(this.$route.query.a); // Initializes assignment ID from route query
      this.exerciseid = Number(this.$route.query.e); // Initializes exercise ID from route query
    },
    beforeUnload(e) {
      e.preventDefault(); // Prevents the default unload behavior
      e.returnValue = ''; // Sets a return value for the unload event
    },
    back() {
      this.$router.push({ path: 'course', query: { id: this.courseid } }); // Navigates back to the course page
    },
    updateCurrentNode(current) {
      this.currentNode = current; // Updates the current node
    },
    updateTree() {
      this.getTree(true); // Refreshes the tree data
    },
    async publish(exercise, assignment) {
      try {
        await exercisesService.changeExercises(this.courseid, assignment, exercise, {
          is_published: !exercise.completed // Toggles the published state
        });

        ElMessage({
          message: exercise.completed ? 'Exercise published' : 'Exercise unpublished',
          type: 'success'
        });
      } catch (err) {
        errorHandler(err); // Handles errors during the publish operation
      }
      this.back(); // Navigates back after publishing
    }
  }
};
</script>


<style>
.tree-node {
  width: 110px;
  height: 100px;
  border-radius: 50%;
  padding-top: 35px;
  text-align: center;
  justify-content: center;
  color: white;
  background-color: #2a9d8f;
}

.tree-node-highlighted {
  width: 110px;
  height: 100px;
  border-radius: 50%;
  padding-top: 35px;
  text-align: center;
  justify-content: center;
  color: white;
  background-color: #e9c46a;
}
</style>
