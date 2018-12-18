import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    chats: [],
    circuitname: '',
    circuitid: 0,
    individual: {},
    menu_diary: false,
    menu_groups: false,
    menu_media: false,
    menu_community: false,
    menu_practice: false,
    menu_blogs: false,
    menu_sermons: false,
    token: ''
  },
  mutations: {
    setBlogs (state, newblogs) {
      state.menu_blogs = newblogs
    },
    setChats (state, newchats) {
      state.chats = newchats
    },
    setCircuitName (state, newname) {
      state.circuitname = newname
    },
    setCircuitId (state, newid) {
      state.circuitid = newid
    },
    setCommunity (state, newbdays) {
      state.menu_community = newbdays
    },
    setDiary (state, newdiary) {
      state.menu_diary = newdiary
    },
    setFeeditems (state, newitems) {
      state.feeditems = newitems
    },
    setGroups (state, newgroups) {
      state.menu_groups = newgroups
    },
    setIndividual (state, newindiv) {
      state.individual = newindiv
    },
    setMedia (state, newmedia) {
      state.menu_media = newmedia
    },
    setPractice (state, newprac) {
      state.menu_practice = newprac
    },
    setSermons (state, newsermons) {
      state.menu_sermons = newsermons
    },
    setSocietyId (state, newsocietyid) {
      state.societyid = newsocietyid
    },
    setSocietyName (state, newsocietyname) {
      state.societyname = newsocietyname
    },
    setToken (state, newtoken) {
      state.token = newtoken
    }
  }
})

export default store
