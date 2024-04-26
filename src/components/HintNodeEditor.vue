<template>
  <div class="bg-gray-100 rounded-xl grid grid-cols-1">
    <div class="grid grid-cols-5 items-center">
      <div class="ml-5 my-5 flex items col-span-4">
        <b v-if="!editing" class="text-2xl mr-4">{{ identifier }}</b>
        <el-input
          v-if="editing"
          v-model="identifier"
          maxlength="12"
          show-word-limit
          style="width: 240px"
          class="mr-4"
        ></el-input>
        <el-button v-if="!editing" @click="editing = !editing" class="transparent-add-button">
          <el-icon>
            <Edit />
          </el-icon>
          <span>Edit</span>
        </el-button>
        <el-button v-if="editing" @click="editNode" class="transparent-add-button">
          <el-icon>
            <Check />
          </el-icon>
          <span>Save</span>
        </el-button>
      </div>
    </div>
    <div class="mx-5 mb-5">
      <span class="font-arial"> Hint and suggestions </span>
      <div class="flex">
        <el-input
          :disabled="!editing"
          v-model="hintdescription"
          :rows="6"
          type="textarea"
          placeholder="Hints and suggestions"
          :resize="'none'"
        />
      </div>
    </div>
    <div class="mx-5 grid grid-cols-6 gap-2 items-center">
      <span class="font-arial col-span-1">Precondition:</span>
      <b class="col-span-5" v-if="currentNode === originNode">This is the origin</b>
      <b v-if="!editing & (currentNode !== originNode)" class="col-span-5">{{ incomingOption }}</b>
      <el-input
        v-if="(currentNode !== originNode) & editing"
        v-model="incomingOption"
        :rows="1"
        type="text"
        clearable
        :placeholder="'Condition'"
        :resize="'none'"
        :disabled="!editing"
        class="col-span-5"
      />
    </div>
    <div class="flex justify-between mt-5">
      <div class="ml-5"><b class="text-xl">Next options</b></div>
      <el-button @click="addOption" class="mr-5 transparent-add-button">
        <el-icon class="mr-2">
          <Plus />
        </el-icon>
        Add option
      </el-button>
    </div>
    <div class="overflow-y-scroll h-[50vh] flex justify-center">
      <draggable
        v-model="outgoingOption"
        @change="console.log(outgoingOption)"
        v-if="outgoingOption.length > 0"
      >
        <transition-group>
          <div
            v-for="(element, index) in outgoingOption"
            :key="element.id"
            class="bg-white border-2 border-gray-300 m-3 rounded-xl"
          >
            <div class="grid grid-cols-4">
              <div class="grid grid-cols-1 col-span-3 m-4">
                <b>Option {{ index + 1 }}</b>
                <i>Condition: {{ element.option }}</i>
              </div>
              <div class="flex items-center col-span-1 m-2">
                <el-button
                  @click="deleteNode(element.destination_hint_node_id)"
                  class="transparent-delete-button"
                >
                  <el-icon>
                    <Delete />
                  </el-icon>
                </el-button>
                <el-button
                  @click="getHintNode(element.destination_hint_node_id)"
                  class="transparent-editor-button"
                >
                  <el-icon>
                    <Right />
                  </el-icon>
                </el-button>
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
// Importing necessary components and services
import { VueDraggableNext } from 'vue-draggable-next'; // Importing VueDraggableNext component for drag-and-drop functionality
import editorService from '@/services/editorService.js'; // Importing editorService for handling editor-related requests
import { ElMessage } from 'element-plus'; // Importing ElMessage component from Element Plus for displaying messages

export default {
  // Components used in the template
  components: {
    draggable: VueDraggableNext // Using VueDraggableNext component for drag-and-drop functionality
  },
  // Props received by the component
  props: ['courseid', 'assignmentid', 'exerciseid', 'currentNode', 'originNode'],
  // Lifecycle hook called when the component is created
  created() {
    // Call method to fetch hint node data for the current node when component is created
    this.getHintNode(this.currentNode);
  },
  // Watcher for changes in currentNode prop
  watch: {
    currentNode: function (newVal) {
      // Watch for changes in selected node and fetch hint node data for the new node
      this.getHintNode(newVal);
    }
  },
  // Data properties for the component
  data() {
    return {
      // Initialize data properties
      isOrigin: false, // Flag to indicate if the node is the origin node
      nodeId: -1, // ID of the hint node
      identifier: '', // Identifier of the hint node
      incomingNodeId: -1, // ID of the incoming hint node
      incomingOption: '', // Incoming option for the hint node
      incomingEdgeId: -1, // ID of the incoming edge
      hintdescription: '', // Description of the hint node
      outgoingOption: [], // Outgoing options for the hint node
      editing: false // Flag to indicate if the node is being edited
    };
  },
  // Methods for the component
  methods: {
    // Method to fetch hint node data for the specified node
    async getHintNode(currentNode) {
      // Call editorService to fetch hint node data for the specified node
      const res = await editorService.getHintNode(
          this.courseid,
          this.assignmentid,
          this.exerciseid,
          currentNode
      );
      // Update data properties with fetched hint node data
      this.isOrigin = res.data.data.is_start_node;
      this.nodeId = res.data.data.id;
      this.identifier = res.data.data.name;
      this.hintdescription = res.data.data.description;
      this.incomingNodeId =
          res.data.data.incoming_option.length === 0
              ? -1
              : res.data.data.incoming_option[0].origin_hint_node_id;
      this.incomingOption =
          res.data.data.incoming_option.length === 0 ? '' : res.data.data.incoming_option[0].option;
      this.incomingEdgeId =
          res.data.data.incoming_option.length === 0 ? -1 : res.data.data.incoming_option[0].id;
      this.outgoingOption = res.data.data.outgoing_options;
      this.updateCurrentNode(currentNode); // Update the current selected node
    },
    // Method to add a new option for the hint node
    async addOption() {
      try {
        // Call editorService to create a new hint node option
        await editorService.createHintNode(
            this.courseid,
            this.assignmentid,
            this.exerciseid,
            this.nodeId,
            'Specify the option here'
        );
        // Fetch updated hint node data after adding option
        const res = await editorService.getHintNode(
            this.courseid,
            this.assignmentid,
            this.exerciseid,
            this.currentNode
        );
        // Update outgoing options with the updated data
        this.outgoingOption = res.data.data.outgoing_options;
        // Display success message
        ElMessage({
          message: 'Option successfully added',
          type: 'success'
        });
      } catch (err) {
        // Display error message if option creation fails
        ElMessage({
          message: 'Error creating option. (' + err.name + ')',
          type: 'fail'
        });
      }
      // Update the tree after adding option
      await this.updateTree();
    },
    // Method to emit 'updateCurrent' event with the current node
    updateCurrentNode(currentNode) {
      this.$emit('updateCurrent', currentNode);
    },
    // Method to emit 'updateTree' event to update the tree
    updateTree() {
      this.$emit('updateTree');
    },
    // Method to edit the hint node
    async editNode() {
      try {
        // Call editorService to edit the hint node
        await editorService.editNode(
            this.courseid,
            this.assignmentid,
            this.exerciseid,
            this.nodeId,
            this.identifier,
            this.hintdescription
        );
        // If the node is not the origin node, edit the incoming edge as well
        if (!this.isOrigin) {
          await editorService.editEdge(
              this.courseid,
              this.assignmentid,
              this.exerciseid,
              this.incomingNodeId,
              this.incomingEdgeId,
              this.incomingOption
          );
        }
        // Display success message
        ElMessage({
          message: 'Node successfully updated.',
          type: 'success'
        });
      } catch (err) {
        // Display error message if node editing fails
        ElMessage({
          message: 'Error editing node. (' + err.name + ')',
          type: 'fail'
        });
      }
      // Update the tree after editing node
      await this.updateTree();
      // Toggle editing flag
      this.editing = !this.editing;
    },
    // Method to delete the hint node
    async deleteNode(nodeId) {
      try {
        // Call editorService to delete the hint node
        await editorService.deleteNode(this.courseid, this.assignmentid, this.exerciseid, nodeId);
        // Display success message
        ElMessage({
          message: 'Successfully deleted node',
          type: 'success'
        });
        // Fetch hint node data for the current node after deletion
        await this.getHintNode(this.currentNode);
      } catch (err) {
        // Display error message if node deletion fails
        ElMessage({
          message: 'Error deleting node. (' + err.name + ')',
          type: 'fail'
        });
      }
      // Update the tree after deleting node
      await this.updateTree();
    }
  }
};
</script>


<style scoped>
.transparent-add-button {
  background-color: transparent;
  color: #2a9d8f;
  border-color: #2a9d8f;
  border-radius: 10px;
  width: 8vw;
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
  width: 60px;
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
  width: 60px;
  font-size: 30px;
}

.transparent-editor-button:hover {
  background-color: #2a9d8f;
  color: white;
  border-color: transparent;
}

hr.rounded {
  border-top: 4px solid #bbb;
  border-radius: 2px;
}
</style>
