<template>
  <div class="w-screen h-screen flex">
    <div class="grid grid-cols-1 relative h-full w-full overflow-y-auto">
      <div class="relative grid grid-cols-1 overflow-visible bg-cover bg-no-repeat h-[10vh] w-full"
           style="background-color: lightgray">
        <EditorHeader :coursename="coursename"
                      :assignmentname="assignmentname"
                      :exercisename="exercisename"
                      @goBack="back"></EditorHeader>
        <div class="grid grid-cols-2 w-full h-[90vh] p-10">
          <vue-tree
              style="width: 45vw; height: 75vh;"
              :dataset="sampleData"
              :config="treeConfig"
              linkStyle="straight"
              class="rounded-xl bg-white border-ut-pink"
          >
            <template v-slot:node="{ node, collapsed }">
              <div
                  :style="{ border: collapsed ? '2px solid grey' : '' }"
                  :class="{'tree-node': node.value !== currentNode,
                   'tree-node-highlighted': node.value === currentNode,}"
              >
          <span style="padding: 4px 0; font-weight: bold;"
          >Step {{ node.value }}</span
          >
              </div>
            </template>
          </vue-tree>
          <div class="bg-gray-100 rounded-xl grid grid-cols-1">
            <div class="ml-5 mt-5"><b class="text-2xl">Step #{{sampleData.value}}</b></div>
            <div class="mx-5">
              <span class="font-arial">
                Hint and suggestions
              </span>
              <el-input
                  v-model="hintdescription"
                  :rows="6"
                  type="textarea"
                  placeholder="Hints and suggestions"
                  :resize="'none'"
              />
            </div>
            <div class="mx-5">
              <span class="font-arial">
                Precondition
              </span>
              <el-input
                  v-model="branchingCondition"
                  :rows="2"
                  type="text"
                  clearable
                  :placeholder="currentNode === 1 ? 'This is the origin' : 'Condition'"
                  :resize="'none'"
                  :disabled="currentNode === 1"
              />
            </div>
            <div class="flex justify-between mt-3">
              <div class="ml-5"><b class="text-xl">Next options</b></div>
              <el-button class="mr-5 transparent-add-button"><el-icon class="mr-2"><Plus /></el-icon>Add option</el-button>
            </div>
<!--            <div v-for="(item, i) in sampleData.children" :key="i" class="bg-white border-2 border-gray-300 m-5 rounded-xl">-->
<!--              <div class="flex grid grid-cols-4">-->
<!--                <div class="grid grid-cols-1 col-span-3 m-4">-->
<!--                  <b>Option {{i+1}}</b>-->
<!--                  <i>Step #{{item.value}}</i>-->
<!--                </div>-->
<!--                <div class="flex items-center col-span-1 m-2">-->
<!--                  <el-button class="transparent-editor-button"><el-icon><Delete /></el-icon></el-button>-->
<!--                  <el-button class="transparent-editor-button"><el-icon><Right /></el-icon></el-button>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
            <div class="overflow-y-auto h-[40vh]">
              <draggable v-model="sampleDraggable">
                <transition-group>
                  <div v-for="element in sampleDraggable" :key="element.id" class="bg-white border-2 border-gray-300 m-3 rounded-xl">
                    <div class="grid grid-cols-4">
                      <div class="grid grid-cols-1 col-span-3 m-4">
                        <b>Option {{element.order}}</b>
                        <i>Precondition: {{element.name}}</i>
                      </div>
                      <div class="flex items-center col-span-1 m-2">
                        <el-button class="transparent-delete-button"><el-icon><Delete /></el-icon></el-button>
                        <el-button class="transparent-editor-button"><el-icon><Right /></el-icon></el-button>
                      </div>
                    </div>
                  </div>
                </transition-group>
              </draggable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTree from "@ssthouse/vue3-tree-chart";
import "@ssthouse/vue3-tree-chart/dist/vue3-tree-chart.css";
import EditorHeader from '../components/EditorHeader.vue';
import { VueDraggableNext } from 'vue-draggable-next'
export default {
  components: {
    VueTree,
    draggable: VueDraggableNext,
  },
  created() {
    this.fetchData();
    window.addEventListener('beforeunload', this.beforeUnload);
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.beforeUnload);
  },
  beforeRouteLeave(to, from, next) {
    // called when the route that renders this component is about to be navigated away from.
    // As with `beforeRouteUpdate`, it has access to `this` component instance.
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (!answer) return false
    next()
  },
  data() {
    return {
      courseid: -1,
      assignmentid: -1,
      exerciseid: -1,
      currentNode: 1,
      coursename: 'Service-oriented Architecture Web Serv. (2023-2A)',
      assignmentname: 'Assignment 1',
      exercisename: 'Exercise 1',
      hintdescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis lectus dapibus, faucibus sem a, venenatis lectus. Maecenas laoreet, turpis sit amet luctus vehicula, risus urna efficitur magna, euismod semper ipsum nunc sed mi. Nunc id eleifend leo. ',
      unsavedChanges: true,
      sampleData: {
        value: 1,
        children: [
          {value: 2, children: [{value: 6}, {value: 7}]},
          {value: 3, children: [{value: 8}, {value: 9}]},
          {value: 4, children: [{value: 10}, {value: 11}]},
          {value: 5, children: [{value: 12}, {value: 13}]}
        ]
      },
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
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      this.courseid = Number(this.$route.query.c);
      this.assignmentid = Number(this.$route.query.a);
      this.exerciseid = Number(this.$route.query.e);
      // todo Query your database with courseId
    },
    beforeUnload(e) {
      if (this.unsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    },
    log(event) {
      console.log(event)
    },
    back() {
      this.$router.push({path: 'course', query: {id: this.courseid}});
    }
  }
}
</script>

<style>
.tree-node {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  padding-top: 35px;
  text-align: center;
  justify-content: center;
  color: white;
  background-color: #2a9d8f;
}

.tree-node-highlighted {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  padding-top: 35px;
  text-align: center;
  justify-content: center;
  color: white;
  background-color: #e9c46a;
}

.transparent-add-button {
  background-color: transparent;
  color: #2a9d8f;
  border-color: #2a9d8f;
  border-radius: 10px;
  width: 8vw
}

.transparent-add-button:hover {
  background-color: #2a9d8f;
  color: white;
  border-color: #2a9d8f;
}

.transparent-delete-button {
  background-color: transparent;
  border-color: transparent;
  height: 60px;
  width:60px;
  font-size: 30px;
}

.transparent-delete-button:hover {
  background-color: lightcoral;
  color: white;
  border-color: transparent;
}

.transparent-editor-button {
  background-color: transparent;
  border-color: transparent;
  height: 60px;
  width:60px;
  font-size: 30px;
}

.transparent-editor-button:hover {
  background-color: #2a9d8f;
  color: white;
  border-color: transparent;
}
</style>