<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm text-center">
          <input @keyup.enter="addRoom" class="" type="text" v-model="roomName" placeholder="room name">
          <button @click="addRoom" class="btn btn-success btn-sm" style="margin-left: 5px;">Add room</button>
          <br><br>
          <div class="card card-signup z-depth-0 text-center bg-transparent border-0" style="width: 500px;height: 600px; max-height: 600px;">
            <div class="card-header">
              <img src="../assets/e56.gif" alt="" style="height: 150px">
            </div>
            <div class="card-body" style="overflow: auto;">
              <div class="row mt-3">
                <div class="col-sm-2" v-for="room in listRooms" :key="room.id">
                  <b-card bg-variant="light" :header="`Room ${room.id}`" class="text-center" @click="enterRoom(room.id)">
                    <b-card-text>Room {{ room.name }}</b-card-text>
                  </b-card>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

import io from 'socket.io-client'
const socket = io('http://localhost:3000')
export default {
  name: 'Home',
  data () {
    return {
      roomName: '',
      listRooms: []
    }
  },
  methods: {
    addRoom () {
      console.log('masuk ke add room', this.roomName)
      socket.emit('createRoom', this.roomName)
    },
    enterRoom (id) {
      this.$router.push(`/room/${id}`)
    }
  },
  created () {
    socket.emit('fetchRooms', this.roomName)
    socket.on('roomCreated', (room) => {
      this.$bvToast.toast(`Add room ${room.id} success`, {
        title: 'Add Room success',
        variant: 'success',
        solid: true
      })
      socket.emit('fetchRooms', this.roomName)
    })
    socket.on('showRooms', (rooms) => {
      this.listRooms = rooms
    })
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
