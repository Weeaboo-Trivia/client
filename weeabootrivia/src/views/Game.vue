<template>
  <div id="game" class="container">
    <div id="selectLevel" v-if="!questionNumber">
      <b-form-select v-model="selected" :options="options"></b-form-select>
      <br><br>
      <b-button @click="levelSelect" variant="outline-primary">Select</b-button>
    </div>
    <!-- {{ questions.length }} -->
    <div v-if="questionNumber">
      <card-question :question="questions[questionNumber-1]"></card-question>
      <!-- {{ questions[questionNumber-1] }} -->
      <button class="btn btn-success" @click="nextQuestion">go</button>
    </div>
    {{ $route.params.id }}
    <br><br>
  </div>
</template>

<script>
import cardQuestion from '../components/CardQuestions'
export default {
  name: 'Game',
  data () {
    return {
      selected: '',
      options: [
        { value: 'easy', text: 'Easy' },
        { value: 'medium', text: 'Medium' },
        { value: 'hard', text: 'Hard' }
      ],
      questionNumber: 0
    }
  },
  methods: {
    levelSelect () {
      console.log(this.selected)
      this.socket.emit('selectLevel', {
        level: this.selected,
        id: this.room.id
      })
    },
    nextQuestion () {
      this.questionNumber++
    }
  },
  components: {
    cardQuestion
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
    },
    questionLevelStatus () {
      if (!this.questions.length) return true
      else return false
    }
  },
  created () {
    this.socket.emit('startGame', this.room)
    this.socket.on('showQuestions', (data) => {
      this.$store.commit('setQuestions', data)
      this.questionNumber++
      this.$router.push('/game/1')
    })
  }
}
</script>

<style>

</style>
