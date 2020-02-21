<template>
  <div class="home">
    <div class="container">
      <!-- <audio-player :sources="audioSources" :loop="true"></audio-player> -->
      <spooky-pic></spooky-pic>
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm text-center">
          <br><br>
          <input @keyup.enter="addRoom" class="" type="text" v-model="roomName" placeholder="room name">
          <button @click="addRoom" class="btn btn-success btn-sm" style="margin-left: 5px;"><i class="fas fa-sign-in-alt"></i></button>
          <br><br>
          <div class="card card-signup z-depth-0 text-center bg-transparent border-0" style="width: 500px;height: 600px; max-height: 600px;">
            <div class="card-header">
              <img src="../assets/e56.gif" alt="" style="height: 150px">
            </div>
            <div class="card-body" style="overflow: auto;">
              <div class="row my-3">
                <div class="col-6 mb-3" v-for="room in listRooms" :key="room.id">
                  <b-card bg-variant="light" :header="`Room ${room.id}`" class="text-center" @click="enterRoom(room.id)">
                    <b-card-text>Room {{ room.name }}</b-card-text>
                  </b-card>
                </div>
              </div>
            </div>
          <!-- <audio src="../assets/sound/まったくなんだかなあ (MATTAKU NANNDAKA NAA) Saekano Original Sound Track.mp3" controls id="myKato" hidden autoplay='autoplay' loop='loop' preload="auto" type='audio/mp3'></audio> -->
          </div>
        </div>
        <div class="col-sm text-center">
          <b-calendar locale="id"></b-calendar>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
// import { Howl } from 'howler'
// import AudioPlayer from '../components/audio-player.vue'
import SpookyPic from '../components/SpookyPic.vue'
export default {
  name: 'Home',
  components: {
    // AudioPlayer,
    SpookyPic
  },
  data () {
    return {
      audioSources: [
        '../assets/sound/まったくなんだかなあ (MATTAKU NANNDAKA NAA) Saekano Original Sound Track.mp3'
      ],
      roomName: '',
      listRooms: [],
      warningBox: ''
    }
  },
  methods: {
    addRoom () {
      console.log('masuk ke add room', this.roomName)
      this.socket.emit('createRoom', this.roomName)
    },
    enterRoom (id) {
      this.$router.push(`/room/${id}`)
    }
  },
  showWarningBox () {
    this.boxTwo = ''
    this.$bvModal.msgBoxOk('Please enter room properly before you play', {
      title: 'Warning',
      size: 'md',
      buttonSize: 'md',
      okVariant: 'warning',
      headerClass: 'p-2 border-bottom-0',
      footerClass: 'p-2 border-top-0',
      centered: true
    })
      .then(value => {
        this.warningBox = value
      })
      .catch(err => {
        console.log(err)
      })
  },

  created () {
    console.log(this.$route, 'Ini router')
    this.socket.emit('fetchRooms', this.roomName)
    this.socket.on('roomCreated', (room) => {
      this.$bvToast.toast(`Add room ${room.id} success`, {
        title: 'Add Room success',
        variant: 'success',
        solid: true
      })
      this.socket.emit('fetchRooms', this.roomName)
    })
    this.socket.on('showRooms', (rooms) => {
      this.listRooms = rooms
    })
    // this.playSound()
  },
  computed: {
    socket () {
      return this.$store.state.socket
    }
  },
  mounted () {
    const x = document.getElementById('myKato')
    x.autoplay = true
    x.load()
  }
}
</script>

<style >
  .bg {
    background-image: url('../assets/saenai-heroine-no-sodatekata-megumi-kato-uhd-4k-wallpaper.jpg');
    max-height: 100vh;
    /* background-position: center; */
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
