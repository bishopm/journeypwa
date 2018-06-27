import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    profile: {},
    circuitname: '',
    circuitid: 0,
    // hostname: 'http://localhost/churchnet/public/api'
    hostname: 'https://church.net.za/api'
  },
  mutations: {
    setProfile (state, newprofile) {
      state.profile = newprofile
    },
    setCircuitName (state, newname) {
      state.circuitname = newname
    },
    setCircuitId (state, newid) {
      state.circuitid = newid
    },
    setSocietyId (state, newsocietyid) {
      state.society = newsocietyid
    }
  }
})

export default store
