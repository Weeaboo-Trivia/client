<template>
  <div id="game">
    ini game
    <b-form-select v-model="selected" :options="options"></b-form-select>
    <br><br>
    <b-button @click="levelSelect" variant="outline-primary">Select</b-button>
    {{ questions }}
    <br><br>
  </div>
</template>

<script>
export default {
  name: 'Game',
  data () {
    return {
      selected: '',
      options: [
        { value: 'easy', text: 'Easy' },
        { value: 'medium', text: 'Medium' },
        { value: 'hard', text: 'Hard' }
      ]
    }
  },
  methods: {
    levelSelect () {
      console.log(this.selected)
      this.socket.emit('selectLevel', {
        level: this.selected,
        id: this.room.id
      })
    }
  },
  computed: {
    socket () {
      return this.$store.state.socket
    },
    room () {
      return this.$store.state.room
    },
    questions () {
      return this.$store.state.questions
    }
  },
  created () {
    this.socket.emit('startGame', this.room)
    this.socket.on('showQuestions', (data) => {
      this.$store.commit('setQuestions', data)
    })
  }
}
</script>

<style>

</style>
