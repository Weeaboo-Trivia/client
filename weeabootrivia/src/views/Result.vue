<template>
<div>
  <audio src="../assets/sound/35_-_chrono_trigger_-_snes_-_fanfare_2.mp3"  hidden controls id="myKato" autoplay='autoplay' preload="auto" type='audio/mp3'></audio>
  <audio src="../assets/sound/dq-menu-theme.mp3"  hidden controls id="myMegumi" autoplay='autoplay' preload="auto" type='audio/mp3' loop='loop'></audio>
  <b-container class="bv-example-row bv-example-row-flex-cols">
    <b-row>
        <b-col align-self="start"></b-col>
        <b-col align-self="center">
            <b-card
                title='Subarashi Senpai!'
                img-src="https://media1.giphy.com/media/lrpjFzqdnZek8/source.gif"
                img-top
                tag='article'
                style="max-width: 20rem; background-color: #FAEBD7; margin-top: 200px;"
                class="mb- text-center"
              >
                <b-card-text>
                    <b-button @click="backToHome">Back To Home</b-button>
                </b-card-text>
              </b-card>
              <b-card
                title='Not good Kohai!'
                img-src="https://thumbs.gfycat.com/PerfectDisloyalBoar-size_restricted.gif"
                img-top
                tag='article'
                style="max-width: 20rem; background-color: #FAEBD7; margin-top: 200px"
                class="mb-2 text-center"
              >
                <b-card-text>
                    <b-button @click="backToHome">Back To Home</b-button>
                </b-card-text>
              </b-card>
        </b-col>
        <b-col align-self="end"></b-col>
    </b-row>
  </b-container>
</div>

</template>

<script>
export default {
  name: 'result',
  data () {
    return {}
  },
  methods: {
    backToHome () {
    }
  }
}
</script>

<style>

</style>
