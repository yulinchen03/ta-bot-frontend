<template>
<div class="absolute inset-x-0 inset-y-0">
  <h1 class="font-arial font-bold">This is where you will find specific help on topic {{helpid}}</h1>
  <div class="absolute bottom-0 bg-ut-pink w-full h-12 flex justify-center items-center text-white font-bold"><h2>Work in progress...</h2></div>
</div>
</template>

<script>
export default {
  created() {
    this.fetchData();
  },
  data() {
    return {
      helpid: -1
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      this.helpid = this.$route.query.id;
      // Query your database with helpid
    },
  }
}
</script>