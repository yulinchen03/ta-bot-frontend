<template>
  <div class="w-screen h-screen flex bg-gray-200 ">
    <div class="bg-gray-500 w-4/5 h-4/5 m-auto rounded-lg relative overflow-y-scroll flex flex-col gap-5" >
      <Messages />
      <Answer />
      <Messages />

    </div>
  </div>
</template>




<script>

import Messages from "@/components/Messsage.vue"

export default {
  components: {
    Messages
  },
}

</script>

<style scoped>


</style>