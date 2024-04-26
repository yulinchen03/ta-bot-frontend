import { ElMessage } from 'element-plus';

export default function errorHandler(error) {
  return ElMessage({
    message:
      error?.response?.data?.status?.errors.join(' ') ||
      error?.response?.data?.status?.message ||
      error.response.data,
    type: 'error'
  });
}
