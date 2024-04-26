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
import { VueDraggableNext } from 'vue-draggable-next';
import editorService from '@/services/editorService.js';
import { ElMessage } from 'element-plus';

export default {
  components: {
    draggable: VueDraggableNext
  },
  props: ['courseid', 'assignmentid', 'exerciseid', 'currentNode', 'originNode'],
  created() {
    this.getHintNode(this.currentNode);
  },
  watch: {
    currentNode: function (newVal) {
      // watch change of selected node
      this.getHintNode(newVal);
    }
  },
  data() {
    return {
      isOrigin: false,
      nodeId: -1,
      identifier: '',
      incomingNodeId: -1,
      incomingOption: '',
      incomingEdgeId: -1,
      hintdescription: '',
      outgoingOption: [],
      editing: false
    };
  },
  methods: {
    async getHintNode(currentNode) {
      const res = await editorService.getHintNode(
        this.courseid,
        this.assignmentid,
        this.exerciseid,
        currentNode
      );
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
      this.updateCurrentNode(currentNode);
    },
    async addOption() {
      try {
        await editorService.createHintNode(
          this.courseid,
          this.assignmentid,
          this.exerciseid,
          this.nodeId,
          'Specify the option here'
        );
        const res = await editorService.getHintNode(
          this.courseid,
          this.assignmentid,
          this.exerciseid,
          this.currentNode
        );
        this.outgoingOption = res.data.data.outgoing_options;
        ElMessage({
          message: 'Option successfuly added',
          type: 'success'
        });
      } catch (err) {
        ElMessage({
          message: 'Error creating option. (' + err.name + ')',
          type: 'fail'
        });
      }
      await this.updateTree();
    },
    updateCurrentNode(currentNode) {
      this.$emit('updateCurrent', currentNode);
    },
    updateTree() {
      this.$emit('updateTree');
    },
    async editNode() {
      try {
        await editorService.editNode(
          this.courseid,
          this.assignmentid,
          this.exerciseid,
          this.nodeId,
          this.identifier,
          this.hintdescription
        );
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
        ElMessage({
          message: 'Node successfully updated.',
          type: 'success'
        });
      } catch (err) {
        ElMessage({
          message: 'Error editing node. (' + err.name + ')',
          type: 'fail'
        });
      }
      await this.updateTree();
      this.editing = !this.editing;
    },
    async deleteNode(nodeId) {
      console.log(nodeId);
      try {
        await editorService.deleteNode(this.courseid, this.assignmentid, this.exerciseid, nodeId);
        ElMessage({
          message: 'Successfully deleted node',
          type: 'success'
        });
        await this.getHintNode(this.currentNode);
      } catch (err) {
        ElMessage({
          message: 'Error deleting node. (' + err.name + ')',
          type: 'fail'
        });
      }
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
