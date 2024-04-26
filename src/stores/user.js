import { defineStore } from 'pinia';

export default defineStore('user', {
  state: () => ({
    token: null,
    user: null
  })
});
