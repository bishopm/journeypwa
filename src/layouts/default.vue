<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-black text-white" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-toolbar-title>
          <router-link to="/" class="text-white text-bold" style="text-decoration:none;"><q-icon size="1.2rem" class="q-mb-xs fas" name="fas fa-hiking" color="white"/> Journey</router-link>
        </q-toolbar-title>
        <q-btn flat dense round @click="rightDrawerOpen = !rightDrawerOpen" aria-label="Menu">
          <q-icon name="fas fa-bars" />
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer side="right" v-model="rightDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <q-list no-border link inset-delimiter>
        <q-expansion-item v-if="societyname()" v-model="expanded" class="text-center society" :label="societyname() + ' Society'">
          <q-item v-if="$store.state.token" to="/church">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-users" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>My church</q-item-label>
              <q-item-label caption>Learn names and faces</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="$store.getters.getMenu('devotional')" :to="this.$store.state.feeditems.devotional.length > 1 ? '/devotionals' : '/devotional/0'">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-pray" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>Daily devotional</q-item-label>
              <q-item-label caption>Devotional readings</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="$store.getters.getMenu('blogs')" :to="this.$store.state.feeditems.blog.length > 1 ? '/blogs' : '/blogposts/0'">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-edit" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>Blog</q-item-label>
              <q-item-label caption>From our blog</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="$store.getters.getMenu('sermon')" :to="this.$store.state.feeditems.sermon.length > 1 ? '/sermonsites' : '/sermon/0'">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-microphone" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>Sermon</q-item-label>
              <q-item-label caption>Last week's sermon</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/diary">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-calendar-alt" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>Calendar</q-item-label>
              <q-item-label caption>Events for your diary</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="$store.getters.getMenu('groups')" to="/content/groups">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-users" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>Groups</q-item-label>
              <q-item-label caption>Small group material</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="$store.getters.getMenu('extra')" to="/content/media">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-images" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>Extra</q-item-label>
              <q-item-label caption>Media / articles</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="$store.getters.getMenu('practice')" to="/content/practice">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-praying-hands" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>Practice</q-item-label>
              <q-item-label caption>Practice or discipline for the week</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/library">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-warehouse" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>Resources</q-item-label>
              <q-item-label caption>Resource library</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/sunday">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-bible" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>Sunday</q-item-label>
              <q-item-label caption>Lectionary readings</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item v-if="circuitname()" class="text-center circuit" :label="circuitname() || 'Circuit'">
          <q-item to="/societies">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-church" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>Services this Sunday</q-item-label>
              <q-item-label caption>Societies and preachers</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item class="text-center administration" label="App administration">
          <q-item to="/settings">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-cogs" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>Settings</q-item-label>
              <q-item-label caption>App settings</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="$store.state.token" to="/me">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-user-cog" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>My details</q-item-label>
              <q-item-label caption>My personal details</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="$store.state.token" to="/reminders">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-inbox" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>My inbox</q-item-label>
              <q-item-label caption>App notifications</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="$store.state.token" to="/subscriptions">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-hand-pointer" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>My subscriptions</q-item-label>
              <q-item-label caption>Methodist blogs, sermons</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
      <q-toolbar v-if="$store.state.token" class="justify-around">
        <q-item class="text-center" to="/">
          <q-item-section>
            <q-icon size="24px" name="fas fa-home" color="white"/>
          </q-item-section>
        </q-item>
        <q-item class="text-center" to="/sunday">
          <q-item-section>
            <q-icon size="24px" name="fas fa-bible" color="white"/>
          </q-item-section>
        </q-item>
        <q-item v-if="this.$store.state.feeditems && this.$store.state.feeditems.devotional" class="text-center" :to="this.$store.state.feeditems.devotional.length > 1 ? '/devotionals' : '/devotional/0'">
          <q-item-section>
            <q-icon size="24px" name="fas fa-pray" color="white"/>
          </q-item-section>
        </q-item>
        <q-item class="text-center" to="/me">
          <q-item-section>
            <q-icon size="24px" name="fas fa-user-cog" color="white"/>
          </q-item-section>
        </q-item>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data () {
    return {
      phoneverified: this.$q.localStorage.getItem('JOURNEY_VerifiedPhone'),
      rightDrawerOpen: this.$q.platform.is.desktop,
      individual: '',
      expanded: true,
      menus: ['blog', 'devotional', 'diary', 'events', 'groups', 'media', 'practice', 'reminders', 'sermon']
    }
  },
  methods: {
    async get_token () {
      if (this.$q.localStorage.getItem('JOURNEY_VerifiedPhone')) {
        this.$axios.post(process.env.API + '/login',
          {
            phone: this.$q.localStorage.getItem('JOURNEY_VerifiedPhone'),
            phonetoken: this.$q.localStorage.getItem('JOURNEY_Phonetoken')
          })
          .then(response => {
            this.$q.localStorage.set('JOURNEY_Token', response.data.token)
            this.$store.commit('setToken', response.data.token)
            if (!this.$q.localStorage.getItem('JOURNEY_Individual')) {
              this.getindiv()
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    societyname () {
      return this.$store.state.societyname
    },
    circuitname () {
      return this.$store.state.circuitname
    },
    household () {
      if (this.$store.state.individual.id) {
        return true
      }
    },
    getfeedcontent () {
      this.$q.loading.show()
      this.$axios.post(process.env.API + '/userfeed',
        {
          society: this.$store.state.societyid,
          individual: this.$store.state.individual.id
        })
        .then(response => {
          this.$q.localStorage.set('JOURNEY_User', response.data.userid)
          this.$store.commit('setFeeditems', response.data)
          for (var mndx in this.menus) {
            if (response.data[this.menus[mndx]]) {
              this.$store.commit('setMenu', [this.menus[mndx], true])
            } else {
              this.$store.commit('setMenu', [this.menus[mndx], false])
            }
          }
          this.$q.loading.hide()
        })
        .catch(function (error) {
          console.log(error)
          // this.$q.loading.hide()
        })
    },
    getindiv () {
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
      this.$axios.post(process.env.API + '/phone',
        {
          phone: this.$q.localStorage.getItem('JOURNEY_VerifiedPhone'),
          society_id: this.$q.localStorage.getItem('JOURNEY_Society')
        })
        .then(response => {
          if (response.data.individual) {
            this.$store.commit('setIndividual', response.data.individual)
            if (!this.$q.localStorage.getItem('JOURNEY_Individual')) {
              this.$q.localStorage.set('JOURNEY_Individual', JSON.stringify(response.data.individual))
            }
          }
          if (this.$store.state.societyid) {
            this.getfeedcontent()
          }
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            localStorage.removeItem('JOURNEY_Token')
            window.location.reload()
          } else {
            console.log(error)
          }
        })
    }
  },
  async mounted () {
    // Deal with upgrades
    if (this.$q.localStorage.getItem('JOURNEY_Version')) {
      if (this.$q.localStorage.getItem('JOURNEY_Version') !== process.env.VERSION) {
        this.$q.dialog({
          title: 'New version available',
          message: 'Click OK to restart the app and upgrade to version ' + process.env.VERSION + '. This new version includes: ' + process.env.VNOTES,
          ok: 'OK',
          cancel: 'LATER'
        }).onOk(() => {
          this.$q.localStorage.set('JOURNEY_Version', process.env.VERSION)
          window.location.reload()
        }).catch(() => {
          console.log('Delaying upgrade')
        })
      }
    } else {
      this.$q.localStorage.set('JOURNEY_Version', process.env.VERSION)
    }
    // Check that settings are intact
    if (this.$q.localStorage.getItem('JOURNEY_Circuit')) {
      this.$store.commit('setSocietyName', this.$q.localStorage.getItem('JOURNEY_Societyname'))
      this.$store.commit('setSocietyId', this.$q.localStorage.getItem('JOURNEY_Society'))
      this.$store.commit('setCircuitId', this.$q.localStorage.getItem('JOURNEY_Circuit'))
      this.$store.commit('setCircuitName', this.$q.localStorage.getItem('JOURNEY_Circuitname'))
    }
    if (!this.$q.localStorage.getItem('JOURNEY_Token')) {
      await this.get_token()
    } else {
      this.$store.commit('setToken', this.$q.localStorage.getItem('JOURNEY_Token'))
    }
    if (this.phoneverified && this.$store.state.token) {
      this.getindiv()
    } else {
      if (this.$store.state.societyid) {
        this.getfeedcontent()
      }
    }
  }
}
</script>

<style>
a, a:hover {
  text-decoration: none;
}
#q-app > div > div.q-drawer-container > aside > div > div > div.q-expansion-item.q-item-type.text-center.society > div > div.q-item.q-item-type.row.no-wrap.q-item--clickable.q-link.cursor-pointer.q-focusable.q-hoverable {
  background-color:#4d7227;
  border-bottom:white solid 2px;
  color: white;
  text-align:center;
}
#q-app > div > div.q-drawer-container > aside > div > div > div.q-expansion-item.q-item-type.text-center.circuit > div > div.q-item.q-item-type.row.no-wrap.q-item--clickable.q-link.cursor-pointer.q-focusable.q-hoverable {
  background-color:#81be41;
  border-bottom:white solid 2px;
  color: white;
  text-align:center;
}
#q-app > div > div.q-drawer-container > aside > div > div > div.q-expansion-item.q-item-type.text-center.administration > div > div.q-item.q-item-type.row.no-wrap.q-item--clickable.q-link.cursor-pointer.q-focusable.q-hoverable {
  background-color:#000000;
  border-bottom:white solid 2px;
  color: white;
  text-align:center;
}
#toolbar {
  display: flex;
  justify-content: space-between;
}
.q-item {
  margin-left: 0px;
  margin-right: 0px;
  padding-left: 20px;
}
</style>
