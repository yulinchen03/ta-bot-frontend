<template>
  <div class="w-screen h-screen bg-gray-200 p-10 flex justify-center align-middle flex-col">
    <div class="flex flex-row w-full justify-between align-middle">
      <div> < Course </div>
      <div class="w-1/4 border flex flex-row justify-between p-3 bg-white rounded-full">
        <div>Exercise 1</div>
        <div> V </div>
      </div>
      <div class="outline-green-500 text-green-500 rounded-md"> Finish </div>
    </div>

    <div class="w-full h-full flex flex-row justify-center align-middle">
      <div class="h-4/5 flex flex-row m-auto">
        <div class="h-full flex w-2/3 outline outline-gray-400 outline-2 rounded-3xl bg-white m-auto relative flex-col">
          <Messages />
          <Answer />
          <Messages />

    </div>
        <div class="m-auto w-1/3">
          <div v-for="option in options" class="w-full bg-white outline outline-ut-blue outline-2 p-3 m-3 box-border rounded-xl hover:bg-ut-blue text-ut-blue hover:text-white hover:cursor-pointer">{{option}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Messages from "@/components/Messsage.vue"

export default {
  data() {
    return {
      options: ['Yes', 'No', 'Yes, but actually no', 'No, but actually yes', 'This is a scrollable list of buttons with no background', 'I become dark when you hover me']
    }
  },
  components: {
    Messages
  },
}

</script>

<style scoped>


</style>