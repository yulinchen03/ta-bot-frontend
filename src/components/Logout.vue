<!--Deprecated component, copy only-->
<el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="500"
    :before-close="handleClose"
>
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
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import errorHandler from "@/utils/errorHandler.js";

const dialogVisible = ref()

const handleClose = (done) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        done()
      })
      .catch(() => {
        errorHandler(err)
      })
}
</script>