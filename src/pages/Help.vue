<template>
  <div class="w-screen h-screen flex bg-gray-200">
    <!-- sidebar -->
    <Sidebar></Sidebar>
    <!--  main -->
    <div class="relative h-screen w-screen overflow-y-scroll">
      <div class="grid grid-cols-1">
        <Header :title="pageTitle"></Header>
        <p class="mx-20 text-justify mb-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
          numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
          optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
          obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
          nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
          tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
          quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
          sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
          recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
          minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
          quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur
          fugiat, temporibus enim commodi iusto libero magni deleniti quod quam
          consequuntur! Commodi minima excepturi repudiandae velit hic maxime
          doloremque. Quaerat provident commodi consectetur veniam similique ad
          earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
          fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore
          suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
          modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam
          totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam
          quasi aliquam eligendi, placeat qui corporis!</p>
        <div class="flex justify-center items-center">
          <img class='object-scale-down w-2/3 rounded-md'
               src="https://1348661504.rsc.cdn77.org/.uc/fc5bbfb1b0102841f0c0000fe710364f87eed6c6b751c00/3.jpg">
        </div>
        <p class="mx-20 text-justify mt-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
          numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
          optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
          obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
          nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
          tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
          quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
          sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
          recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
          minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
          quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur
          fugiat, temporibus enim commodi iusto libero magni deleniti quod quam
          consequuntur! Commodi minima excepturi repudiandae velit hic maxime
          doloremque. Quaerat provident commodi consectetur veniam similique ad
          earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
          fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore
          suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
          modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam
          totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam
          quasi aliquam eligendi, placeat qui corporis!</p>
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
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  components: {Sidebar, Header},
  created() {
    this.fetchData();
  },
  data() {
    return {
      helpid: -1,
      pageTitle: 'Lorem ipsum dolor'
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

<script setup>
const url =
    'https://image.isu.pub/210305085437-97200a61da6e877cd7ffc0f9b8c52298/jpg/page_1.jpg'
const srcList = [
  'https://image.isu.pub/210305085437-97200a61da6e877cd7ffc0f9b8c52298/jpg/page_1.jpg',
  'https://1348661504.rsc.cdn77.org/.uc/ibae0edb301027c3314008f110e034c4df9a1829c941d0701c3dc05000080/campus-2.jpg',
  'https://www.utwente.nl/.uc/icdb0f7340102efb61600780a2c0375ec7e528a46ae380701c45604ac0180/7g5rhwk-dmu-e9tcfmgo2w.jpg',
]
</script>