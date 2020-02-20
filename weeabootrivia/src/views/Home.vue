<template>
  <div class="home">
    <input @keyup.enter="addRoom" type="text" v-model="roomName">
    <button @click="addRoom">Add room</button>
    <div class="row mt-3">
      <div class="col-sm-2" v-for="room in listRooms" :key="room.id">
        <b-card bg-variant="light" :header="`Room ${room.id}`" class="text-center" @click="enterRoom(room.id)">
          <b-card-text>Room {{ room.name }}</b-card-text>
        </b-card>
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
