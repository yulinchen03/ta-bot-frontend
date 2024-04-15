<template>
  <div class="w-screen h-screen flex">
    <div class="grid grid-cols-1 relative h-full w-full overflow-y-auto">
      <div class="relative grid grid-cols-1 overflow-visible bg-cover bg-no-repeat h-[10vh] w-full"
           style="background-color: lightgray">
        <EditorHeader :coursename="coursename"
                      :assignmentname="assignmentname"
                      :exercisename="exercisename"
                      :courseId="courseid"
                      :assignmentId="assignmentid"
                      :exerciseId="exerciseid"
                      @publish="publish(exerciseid, assignmentid)"
                      @goBack="back"></EditorHeader>
        <div class="grid grid-cols-2 w-full h-[80vh] lg:p-4 xl:p-6 2xl:p-8">
          <vue-tree
              style="width: 45vw; height: 90vh;"
              :dataset="treeData"
              :config="treeConfig"
              linkStyle="straight"
              class="rounded-xl bg-white border-ut-pink"
              :collapse-enabled="false"
          >
            <template v-slot:node="{ node }">
              <div @click="updateCurrentNode(node.id)"
                  :style="{ border: collapsed ? '2px solid grey' : '' }"
                  :class="{'tree-node': node.id !== currentNode,
                   'tree-node-highlighted': node.id === currentNode,}">
                <span style="padding: 4px 0; font-weight: bold;" class="overflow-hidden"
                >{{ node.name }}</span>
              </div>
            </template>
          </vue-tree>
          <HintNodeEditor @updateCurrent="updateCurrentNode" @updateTree="updateTree" v-if="loadReady" :courseid="courseid" :assignmentid="assignmentid" :exerciseid="exerciseid" :currentNode="currentNode" :originNode="originNode"></HintNodeEditor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTree from "@ssthouse/vue3-tree-chart";
import "@ssthouse/vue3-tree-chart/dist/vue3-tree-chart.css";
import editorService from "@/services/editorService.js";
import HintNodeEditor from "@/components/HintNodeEditor.vue";
import EditorHeader from "@/components/EditorHeader.vue";
import exercisesService from "@/services/exercisesService.js";
import {ElMessage} from "element-plus";
export default {
  components: {
    EditorHeader,
    HintNodeEditor,
    VueTree,
  },
  created() {
    this.initializeData();
    this.getTree(false);
    this.getCourse();
    this.getAssignment();
    this.getExercise();
    window.addEventListener('beforeunload', this.beforeUnload);
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.beforeUnload);
  },
  beforeRouteLeave(to, from, next) {
    // called when the route that renders this component is about to be navigated away from.
    // As with `beforeRouteUpdate`, it has access to `this` component instance.
    const answer = window.confirm('Do you really want to leave? you may have unsaved changes!')
    if (!answer) return false
    next()
  },
  data() {
    return {
      courseid: -1,
      assignmentid: -1,
      exerciseid: -1,
      currentNode: -1,
      originNode: -1,
      coursename: '',
      assignmentname: '',
      exercisename: '',
      hintdescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis lectus dapibus, faucibus sem a, venenatis lectus. Maecenas laoreet, turpis sit amet luctus vehicula, risus urna efficitur magna, euismod semper ipsum nunc sed mi. Nunc id eleifend leo. ',
      loadReady: false, // check if the tree data has been received properly before loading the HintNodeEditor component
      treeData: {},
      treeConfig: {nodeWidth: 120, nodeHeight: 80, levelHeight: 200},
      branchingCondition: '',
      enabled: true,
      sampleDraggable: [
        {
          "name": "vue.js 3.0",
          "order": 1
        },
        {
          "name": "vue.draggable",
          "order": 2
        },
        {
          "name": "draggable",
          "order": 3
        },
        {
          "name": "component",
          "order": 4
        },
      ]
    }
  },
  methods: {
    async getTree(refresh) {
      try {
        const res = await editorService.getTree(this.courseid, this.assignmentid, this.exerciseid);
        this.treeData = res.data.data;
        this.originNode = this.treeData.id
        if(!refresh){
          this.currentNode = this.originNode
        }
        this.loadReady = true
      } catch (err) {
        // TODO handle error
        console.log(err)
      }
    },
    async getCourse() {
      const res = await editorService.getCourse(this.courseid);
      this.coursename = res.data.data.name
    },
    async getAssignment() {
      const res = await editorService.getAssignment(this.courseid, this.assignmentid);
      this.assignmentname = res.data.data.name
    },
    async getExercise() {
      const res = await editorService.getExercise(this.courseid, this.assignmentid, this.exerciseid);
      this.exercisename = res.data.data.identifier
    },
    initializeData() {
      this.courseid = Number(this.$route.query.c);
      this.assignmentid = Number(this.$route.query.a);
      this.exerciseid = Number(this.$route.query.e);
    },
    beforeUnload(e) {
        e.preventDefault();
        e.returnValue = '';
    },
    back() {
      this.$router.push({path: 'course', query: {id: this.courseid}});
    },
    updateCurrentNode(current) {
      this.currentNode = current
    },
    updateTree() {
      this.getTree(true)
    },
    async publish(exercise, assignment) {
      try {
        await exercisesService.changeExercises(this.courseid, assignment, exercise, {is_published: !exercise.completed})

        ElMessage({
          message: !exercise.completed ? 'Exercise published' : 'Exercise unpublished',
          type: 'success',
        })
      } catch (err) {
        //TODO handle error
        console.log(err)
        ElMessage({
          message: err.message,
          type: 'fail',
        })
      }
      this.back()
    },
  }
}
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