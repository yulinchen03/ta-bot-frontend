<template>
  <div class="w-full mx-3 box-border border border-1 align-middle rounded-3xl border-ut-light-gray flex flex-row justify-between p-3">
    <div class="flex flex-row w-fit align-middle">
<!--      NOTES TO YULIN: this needs to be with user.id, I imitate having a avatar with that-->
      <div class="text-lg w-fit h-fit">{{course.name}}</div>
      <div class="text-lg text-ut-light-gray h-fit">{{course.instructor}}</div>
    </div>
    <div class="text-lg text-ut-gold">{{course.access_id}}</div>
  </div>
</template>

<script>
export default {
  props: ['course'],
}

</script>
