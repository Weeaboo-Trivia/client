import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    room: {
      id: null,
      players: []
    },
    socket: io('http://localhost:3000'),
    questions: []
  },
  mutations: {
    enterRoom (state, data) {
      state.room.id = data
    },
    pushNewPlayer (state, data) {
      state.room.players.push(data)
    },
    syncRoom (state, data) {
      state.room = data
    },
    setQuestions (state, data) {
      state.questions = data
    }
  },
  actions: {
  },
  modules: {
  }
})
