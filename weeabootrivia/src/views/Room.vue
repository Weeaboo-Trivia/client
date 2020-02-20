<template>
  <div class="about">
    <div class="container">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-7">
          <div class="card card-signup z-depth-0 bg-transparent border-0">
            <div class="card-header text-center">
              <h1>Room {{ roomKe }}</h1>
              <input @keyup.enter="submitName" type="text" v-model="name" placeholder="Enter your name and press enter..." style="width: 300px;">
            </div>
            <div class="card-body">
              <b-card-group style="max-height: 500px">
                <b-card style="background-color: #FAEBD7">
                  <b-card-img src="https://i.ya-webdesign.com/images/anime-png-gifs-6.gif" class="rounded-0" style="margin-top: 80px; background-color: #FAEBD7"></b-card-img>
                </b-card>
                <b-card title="Title" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top>
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
