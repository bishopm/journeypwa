import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      circuitname: '',
      circuitid: 0,
      individual: {},
      menu_devotional: false,
      menu_diary: false,
      menu_groups: false,
      menu_media: false,
      menu_community: false,
      menu_practice: false,
      menu_blog: false,
      menu_sermon: false,
      menu_reminders: false,
      token: ''
    },
    getters: {
      getMenu: (state) => (menu) => {
        return state['menu_' + menu]
      }
    },
    mutations: {
      setMenu (state, marray) {
        state['menu_' + marray[0]] = marray[1]
      },
      setCircuitName (state, newname) {
        state.circuitname = newname
      },
      setCircuitId (state, newid) {
        state.circuitid = newid
      },
      setFeeditems (state, newitems) {
        state.feeditems = newitems
      },
      setIndividual (state, newindiv) {
        state.individual = newindiv
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
    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEV
  })

  return Store
}
