<template>
  <div class="about">
    <div class="container">
      <audio src="../assets/sound/メインテーマ (MAIN THEME) Saekano Original Sound Track.mp3" hidden controls id="myKato" autoplay='autoplay' loop='loop' preload="auto" type='audio/mp3'></audio>
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-7">
          <div class="card card-signup z-depth-0 bg-transparent border-0" style="margin-bottom: auto">
            <div class="card-header text-center">
              <h1 style="color: #8B008B">Room {{ roomKe }}</h1>
              <label for="enterRoom">Enter your name to enter this room</label> <br>
              <input id="enterRoom" @keyup.enter="submitName" type="text" v-model="name" placeholder="Enter your name and press enter..." style="width: 300px;" > <br><br>
              <button class="btn btn-primary" @click="startGame" v-if="startButton">Start Game</button>
            </div>
            <div class="card-body">
              <b-card-group style="height: 500px; max-height: 500px">
                <b-card style="background-color: #FAEBD7">
                  <b-card-img src="https://i.ya-webdesign.com/images/anime-png-gifs-6.gif" class="rounded-0" style="margin-top: 80px; background-color: #FAEBD7"></b-card-img>
                </b-card>
                <b-card>
                  <h5 v-for="name in room.players" :key="name.id">{{ name }}</h5>
                  <button @click="startGame" class="btn btn-primary" v-if="startButton">Start Game</button>
                </b-card>
              </b-card-group>
            </div>
          </div>
        </div>
        <div class="col-sm-1"></div>
      </div>
    </div>
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
    },
    startGame () {
      this.$router.push('/game')
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

<style>
</style>
