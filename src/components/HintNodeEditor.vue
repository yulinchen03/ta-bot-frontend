<template>
  <div class="bg-gray-100 rounded-xl grid grid-cols-1">
    <div class="ml-5 my-5 flex items">
      <b v-if="!editingName" class="text-2xl mr-4">{{identifier}}</b>
      <el-input v-if="editingName" v-model="identifier" style="width: 240px" class="mr-4"></el-input>
      <el-button @click="editingName=!editingName" circle><el-icon v-if="!editingName"><Edit /></el-icon><el-icon v-if="editingName"><Check /></el-icon></el-button>
    </div>
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
          v-model="incomingOption"
          :rows="2"
          type="text"
          clearable
          :placeholder="currentNode === originNode ? 'This is the origin' : 'Condition'"
          :resize="'none'"
          :disabled="currentNode === originNode"
      />
    </div>
    <div class="flex justify-between mt-3">
      <div class="ml-5"><b class="text-xl">Next options</b></div>
      <el-button class="mr-5 transparent-add-button"><el-icon class="mr-2"><Plus /></el-icon>Add option</el-button>
    </div>
    <div class="overflow-y-auto h-[40vh] flex items-center justify-center">
      <draggable v-model="outgoingOption" @change="console.log(outgoingOption)" v-if="outgoingOption.length>0">
        <transition-group>
          <div v-for="(element, index) in outgoingOption" :key="element.id" class="bg-white border-2 border-gray-300 m-3 rounded-xl">
            <div class="grid grid-cols-4">
              <div class="grid grid-cols-1 col-span-3 m-4">
                <b>Option {{index+1}}</b>
                <i>Condition: {{element.edge_option}}</i>
              </div>
              <div class="flex items-center col-span-1 m-2">
                <el-button class="transparent-delete-button"><el-icon><Delete /></el-icon></el-button>
                <el-button @click="getHintNode(element.next_node_id)" class="transparent-editor-button"><el-icon><Right /></el-icon></el-button>
              </div>
            </div>
          </div>
        </transition-group>
      </draggable>
      <div v-else>
        <b>None</b>
      </div>
    </div>
  </div>
</template>

<script>
import {VueDraggableNext} from "vue-draggable-next";
import editorService from "@/services/editorService.js";
export default {
  components: {
    draggable: VueDraggableNext,
  },
  props: ['courseid', 'assignmentid', 'exerciseid', 'currentNode', 'originNode'],
  created() {
    this.getHintNode(this.currentNode);
  },
  watch: {
    currentNode: function(newVal, oldVal) { // watch change of selected node
      this.getHintNode(newVal)
    }
  },
  data() {
    return {
      identifier: '',
      incomingOption: '',
      hintdescription: '',
      outgoingOption: [],
      editingName: false
    }
  },
  methods: {
    async getHintNode(currentNode) {
      const res = await editorService.getHintNode(this.courseid, this.assignmentid, this.exerciseid, currentNode);
      console.log(res)
      this.identifier = res.data.data.name
      this.hintdescription = res.data.data.description
      this.incomingOption = res.data.data.incoming_option.option
      this.outgoingOption = res.data.data.outgoing_options
      this.updateCurrentNode(currentNode)
    },
    async addOption() {

    },
    updateCurrentNode(currentNode) {
      this.$emit('updateCurrent', currentNode)
    }
  }
}

</script>

<style scoped>
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