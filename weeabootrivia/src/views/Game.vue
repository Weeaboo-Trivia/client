<template>
  <div id="game">
    <div class="container">
      <audio src="../assets/sound/tuturu_1.mp3" hidden controls id="myKato" autoplay='autoplay' loop='loop' preload="auto" type='audio/mp3'></audio>
      <audio src="../assets/sound/Tengen Toppa Gurren Lagann OST Sorairo Days FULL VERSION.mp3" hidden controls id="myKato" autoplay='autoplay' loop='loop' preload="auto" type='audio/mp3'></audio>
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-7">
            <div v-if="!questionNumber" class="card card-signup z-depth-0 bg-transparent border-0">
              <div class="card-header text-center">
                <b-form-select v-model="selected" :options="options"></b-form-select>
                <br><br>
                <b-button @click="levelSelect" variant="outline-primary">Select</b-button>
              </div>
              <div v-if="questions.length" class="card-body">
                <b-card-group size="lg" style="overflow: auto">
                  <b-card style="background-color: #FAEBD7">
                    <b-card-img src="https://i.gifer.com/WMDv.gif" hidden class="rounded-0" style="margin-top: 80px; background-color: #FAEBD7"></b-card-img>
                  </b-card>
                  <b-card>
                    <label>Question:</label><br>
                    <card-question :question="questions[questionNumber-1]"></card-question>
                    <button class="btn btn-success" @click="nextQuestion">go</button>
                  </b-card>
                </b-card-group>
              </div>
            </div>
            <br><br>
        </div>
        <div class="col-sm-1"></div>
      </div>
    </div>
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
