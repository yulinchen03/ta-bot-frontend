<template>
  <div class="w-full mx-3 box-border border border-1 align-middle rounded-3xl border-ut-light-gray flex flex-row justify-between p-3">
    <div class="flex flex-row w-full align-middle">
<!--    TODO  NOTES TO YULIN: this needs to be with user.id, I imitate having a avatar with that-->
      <img :src="'https://xsgames.co/randomusers/avatar.php?g=pixel&' + user.id" class="w-12 h-12 aspect-square rounded-full" />
      <div v-if="!showEdit" class="text-lg w-fit h-fit">{{user.name}}</div>
      <input class="p-1" v-model="user.name" v-if="showEdit" placeholder="name" />

      <div v-if="!showEdit" class="text-lg w-fit h-fit">{{user.surname}}</div>
      <input v-model="user.surname" v-if="showEdit" placeholder="surname" />

      <div v-if="!showEdit"  class="text-lg text-ut-light-gray h-fit">{{user.email}}</div>
      <input class="w-1/3 p-1" v-model="user.email" v-if="showEdit" placeholder="email" />

      <button @click="editUserAdmin(user.id, { name: user.name, surname: user.surname, email: user.email})" v-if="showEdit">OK</button>
    </div>
    <div class="text-lg text-ut-gold">{{user.role}}</div>
    <!-- TODO TO BE CHANGED OR REMOVED LATER AND CHANGED INTO THE POP UP-->
    <div class="flex flex-row gap-4">
      <button @click="this.$emit('deleteUser')">Delete</button>
      <button @click="showEdit = !showEdit">Edit</button>
      <button @click="this.$emit('switchRole')" v-if="user.role === 'student'">Promote to teacher</button>
      <button  @click="this.$emit('switchRole')" v-if="user.role === 'teacher'">Demote to student</button>

    </div>
    <!-- END -->
  </div>

</template>

<script>
export default {
  data() {
    return {
      showEdit: false,
    }
    },
  props: ['user'],
  emits: ['deleteUser', 'switchRole', 'editUserAdmin'],
  methods: {
    editUserAdmin(id, user) {
      this.$emit('editUserAdmin', id, user);
      this.showEdit = false;
    }
  }
}

</script>
