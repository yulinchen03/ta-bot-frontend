<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <!-- sidebar -->
    <Sidebar></Sidebar>
    <!--  main -->
    <div class="relative h-screen w-screen overflow-y-scroll">
      <div class="grid grid-cols-1">
        <Header :title="pageTitle"></Header>
        <p class="mx-20 text-justify mb-10">
          Replace this content with your own.
        </p>
        <div class="flex justify-center items-center">
          <img
            class="object-scale-down w-2/3 rounded-md"
            src="https://1348661504.rsc.cdn77.org/.uc/fc5bbfb1b0102841f0c0000fe710364f87eed6c6b751c00/3.jpg"
          />
        </div>
        <p class="mx-20 text-justify mt-10">
          Replace this content with your own.
        </p>
        <div class="flex justify-center mt-10">
          <el-image
            style="height: 50%"
            :src="url"
            :zoom-rate="1.2"
            :max-scale="2"
            :min-scale="0.5"
            :preview-src-list="srcList"
            :initial-index="0"
            fit="contain"
            :hide-on-click-modal="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'; // Imports the Header component from the components directory
import Sidebar from '@/components/Sidebar.vue'; // Imports the Sidebar component from the components directory

export default {
  components: {
    Sidebar, // Registers the Sidebar component for use in this component
    Header // Registers the Header component for use in this component
  },
  created() {
    this.fetchData(); // Calls fetchData method when the component is created
  },
  data() {
    return {
      helpid: -1, // Initializes helpid with a default value
      pageTitle: 'Lorem ipsum dolor' // Static title for the page
    };
  },
  watch: {
    $route: 'fetchData' // Watches for changes in the route and calls fetchData when a change occurs
  },
  methods: {
    fetchData() {
      this.helpid = this.$route.query.id; // Updates helpid from the route query parameters
      // Here you would typically include a call to fetch data from a database or another service
      // using the helpid to query relevant help or support information.
    }
  }
};
</script>


<script setup>
const url = 'https://image.isu.pub/210305085437-97200a61da6e877cd7ffc0f9b8c52298/jpg/page_1.jpg';
const srcList = [
  'https://image.isu.pub/210305085437-97200a61da6e877cd7ffc0f9b8c52298/jpg/page_1.jpg',
  'https://1348661504.rsc.cdn77.org/.uc/ibae0edb301027c3314008f110e034c4df9a1829c941d0701c3dc05000080/campus-2.jpg',
  'https://www.utwente.nl/.uc/icdb0f7340102efb61600780a2c0375ec7e528a46ae380701c45604ac0180/7g5rhwk-dmu-e9tcfmgo2w.jpg'
];
</script>
