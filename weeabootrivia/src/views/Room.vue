<template>
  <div class="about">
    <h1>Room {{ roomKe }}</h1>
    <label for="enterRoom">Enter your name to enter this room</label> <br>
    <input id="enterRoom" @keyup.enter="submitName" type="text" v-model="name" placeholder="Enter your name and press enter..." style="width: 300px;">
    <br><br>
    <br>
    {{ room }}
    <button class="btn btn-primary" v-if="startButton">Start</button>
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
      this.socket.emit('joinRoom', { id: this.roomKe, name: this.name })
      this.name = ''
    }
  },
  computed: {
    room () {
      return this.$store.state.room
    },
    socket () {
      return this.$store.state.socket
    },
    startButton () {
      if (this.room.players.length > 1) return true
      else return false
    }
  },
  created () {
    this.socket.on('someoneJoined', (data) => {
      this.$bvToast.toast(`${data.name} is join room ${data.id}`, {
        title: 'New Player join',
        variant: 'info',
        solid: true
      })
      this.$store.commit('pushNewPlayer', data.name)
      this.socket.emit('syncPlayers', this.room)
    })

    this.socket.on('enteredRoom', (data) => {
      this.$store.commit('enterRoom', data.id)
      this.$store.commit('pushNewPlayer', data.name)
    })

    this.socket.on('syncRoomData', (data) => {
      this.$store.commit('syncRoom', data)
    })
  }
}
</script>
