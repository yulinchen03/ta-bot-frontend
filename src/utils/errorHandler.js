import { ElMessage } from 'element-plus';

/**
 * Handles errors by displaying error messages using Element Plus's ElMessage component.
 * @param {Error} error - The error object to be handled.
 * @returns {void}
 */
export default function errorHandler(error) {
  return ElMessage({
    message:
      error?.response?.data?.status?.errors.join(' ') ||
      error?.response?.data?.status?.message ||
      error.response.data,
    type: 'error'
  });
}
