<template>
  <div class="flex flex-row gap-5 p-12 justify-end align-middle w-full">
    <div class="shadow-2xl p-4 text-white rounded-3xl text-center align-middle w-fit bg-ut-green">
      {{ answer }}
    </div>
    <div class="shadow-2xl rounded-full bg-white h-16 aspect-square p-3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
        <path
          fill="currentColor"
          d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384m0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512m320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0"
        ></path>
      </svg>
    </div>
  </div>
</template>
<script>
// Component definition for displaying an answer
export default {
  // Name of the component
  name: 'Answer',
  // Props received by the component
  props: ['answer']
};
</script>

