<!--Deprecated component, copy only-->
<el-dialog v-model="dialogVisible" title="Tips" width="500" :before-close="handleClose">
  <span>This is a message</span>
  <template #footer>
    <div class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="dialogVisible = false">
        Confirm
      </el-button>
    </div>
  </template>
</el-dialog>

<script setup>
// Importing necessary components and utilities
import { ElMessageBox } from 'element-plus'; // Importing ElMessageBox component from Element Plus library
import errorHandler from '@/utils/errorHandler.js'; // Importing errorHandler utility function

// Defining reactive state
const dialogVisible = ref(); // Reactive reference for dialog visibility

// Handling dialog closure
const handleClose = (done) => {
  // Showing confirmation dialog using ElMessageBox
  ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        // Executed when user confirms closing the dialog
        done(); // Invoke done callback to close the dialog
      })
      .catch((err) => {
        // Executed if there's an error while handling dialog closure
        errorHandler(err); // Handle error using errorHandler utility function
      });
};
</script>

