<template>
  <div class="about">
    <h1>Room {{ roomKe }}</h1>
    <input @keyup.enter="submitName" type="text" v-model="name" placeholder="Enter your name and press enter..." style="width: 300px;">
  </div>
</template>

<script>
export default {
  name: 'Room',
  data () {
    return {
      roomKe: this.$route.params.id,
      name: ''
    }
  },
  methods: {
    submitName () {
      console.log(this.name)
      this.name = ''
    }
  },
  computed: {
    room () {
      return this.$store.state.room
    }
  }
}
</script>
