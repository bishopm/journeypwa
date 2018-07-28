import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    profile: {},
    circuitname: '',
    circuitid: 0,
    menu_groups: false,
    menu_media: false,
    menu_community: false,
    menu_practice: false,
    hostname: 'http://localhost/churchnet/public/api'
    // hostname: 'https://church.net.za/api'
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
      state.societyid = newsocietyid
    },
    setSocietyName (state, newsocietyname) {
      state.societyname = newsocietyname
    },
    setGroups (state, newgroups) {
      state.menu_groups = newgroups
    },
    setCommunity (state, newbdays) {
      state.menu_community = newbdays
    },
    setFeeditems (state, newitems) {
      state.feeditems = newitems
    },
    setMedia (state, newmedia) {
      state.menu_media = newmedia
    },
    setPractice (state, newprac) {
      state.menu_practice = newprac
    }
  }
})

export default store
