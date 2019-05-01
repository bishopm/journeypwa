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
          <q-item to="/church">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-users" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>My church</q-item-label>
              <q-item-label caption>Names and faces</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="messages()" to="/messages">
            <q-item-section avatar>
              <q-icon color="primary" name="message" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>Messages: {{messages()}}</q-item-label>
              <q-item-label caption>Inbox messages</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="menu_community()" to="/community">
            <q-item-section avatar>
              <q-icon color="primary" name="people_outline" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>Community</q-item-label>
              <q-item-label caption>Community news and needs</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="menu_devotional()" :to="this.$store.state.feeditems.devotional.length > 1 ? '/devotionals' : '/devotional/0'">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-pray" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>Daily devotional</q-item-label>
              <q-item-label caption>Devotional readings</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="menu_blogs()" :to="this.$store.state.feeditems.blog.length > 1 ? '/blogs' : '/blogposts/0'">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-edit" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>Blog</q-item-label>
              <q-item-label caption>From our blog</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="menu_sermons()" :to="this.$store.state.feeditems.sermon.length > 1 ? '/sermonsites' : '/sermon/0'">
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
          <q-item v-if="menu_groups()" to="/content/groups">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-users" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>Groups</q-item-label>
              <q-item-label caption>Small group material</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="menu_media()" to="/content/media">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-images" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>Extra</q-item-label>
              <q-item-label caption>Media / articles</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="menu_practice()" to="/content/practice">
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
          <q-item to="/me">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-user-cog" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>My details</q-item-label>
              <q-item-label caption>My personal details</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/reminders">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-inbox" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>My inbox</q-item-label>
              <q-item-label caption>App notifications</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/subscriptions">
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
      <q-toolbar class="justify-around">
        <q-item class="text-center" to="/home">
          <q-item-section avatar>
            <q-icon name="fas fa-home" color="white"/>
          </q-item-section>
        </q-item>
        <q-item class="text-center" to="/sunday">
          <q-item-section avatar>
            <q-icon name="fas fa-bible" color="white"/>
          </q-item-section>
        </q-item>
        <q-item class="text-center" to="/ffdl">
          <q-item-section avatar>
            <q-icon name="fas fa-pray" color="white"/>
          </q-item-section>
        </q-item>
        <q-item class="text-center" to="/me">
          <q-item-section avatar>
            <q-icon name="fas fa-user-cog" color="white"/>
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
      phoneverified: localStorage.getItem('JOURNEY_VerifiedPhone'),
      rightDrawerOpen: this.$q.platform.is.desktop,
      individual: '',
      expanded: true
    }
  },
  methods: {
    async get_token () {
      if (localStorage.getItem('JOURNEY_VerifiedPhone')) {
        this.$axios.post(process.env.API + '/login',
          {
            phone: localStorage.getItem('JOURNEY_VerifiedPhone'),
            phonetoken: localStorage.getItem('JOURNEY_Phonetoken')
          })
          .then(response => {
            localStorage.setItem('JOURNEY_Token', response.data.token)
            this.$store.commit('setToken', response.data.token)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    menu_devotional () {
      return this.$store.state.menu_devotional
    },
    menu_media () {
      return this.$store.state.menu_media
    },
    menu_groups () {
      return this.$store.state.menu_groups
    },
    menu_community () {
      return this.$store.state.menu_community
    },
    menu_practice () {
      return this.$store.state.menu_practice
    },
    menu_blogs () {
      return this.$store.state.menu_blogs
    },
    menu_sermons () {
      return this.$store.state.menu_sermons
    },
    societyname () {
      return this.$store.state.societyname
    },
    circuitname () {
      return this.$store.state.circuitname
    },
    messages () {
      return this.$store.state.chats.length
    },
    household () {
      if (this.$store.state.individual.id) {
        return true
      }
    }
  },
  async mounted () {
    // Deal with upgrades
    if (localStorage.getItem('JOURNEY_Version')) {
      if (localStorage.getItem('JOURNEY_Version') !== process.env.VERSION) {
        this.$q.dialog({
          title: 'New version available',
          message: 'Click OK to restart the app and upgrade to version ' + process.env.VERSION + '. This new version includes: ' + process.env.VNOTES,
          ok: 'OK',
          cancel: 'LATER'
        }).onOk(() => {
          localStorage.setItem('JOURNEY_Version', process.env.VERSION)
          window.location.reload()
        }).catch(() => {
          console.log('Delaying upgrade')
        })
      }
    } else {
      localStorage.setItem('JOURNEY_Version', process.env.VERSION)
    }
    if (localStorage.getItem('JOURNEY_Circuit')) {
      this.$store.commit('setSocietyName', localStorage.getItem('JOURNEY_Societyname'))
      this.$store.commit('setSocietyId', localStorage.getItem('JOURNEY_Society'))
      this.$store.commit('setCircuitId', localStorage.getItem('JOURNEY_Circuit'))
      this.$store.commit('setCircuitName', localStorage.getItem('JOURNEY_Circuitname'))
    } else {
      this.$router.push({ name: 'settings' })
    }
    // Populate user state
    if (this.$store.state.individual) {
      this.individual = this.$store.state.individual.id
    } else {
      this.individual = ''
    }
    if (!localStorage.getItem('JOURNEY_Token')) {
      await this.get_token()
    } else {
      this.$store.commit('setToken', localStorage.getItem('JOURNEY_Token'))
    }
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    if (this.$store.state.societyid) {
      this.$q.loading.show()
      this.$axios.post(process.env.API + '/userfeed',
        {
          society: this.$store.state.societyid,
          individual: this.individual
        })
        .then(response => {
          localStorage.setItem('JOURNEY_User', response.data.userid)
          this.$store.commit('setFeeditems', response.data)
          if (response.data.diary) {
            this.$store.commit('setDiary', true)
          } else {
            this.$store.commit('setDiary', false)
          }
          if (response.data.groups) {
            this.$store.commit('setGroups', true)
          } else {
            this.$store.commit('setGroups', false)
          }
          if ((response.data.events) && (response.data.events.length)) {
            this.$store.commit('setEvents', true)
          } else {
            this.$store.commit('setEvents', false)
          }
          if ((response.data.devotional) && (response.data.devotional.length)) {
            this.$store.commit('setDevotional', true)
          } else {
            this.$store.commit('setDevotional', false)
          }
          if ((response.data.diary) && (response.data.diary.length)) {
            this.$store.commit('setDiary', true)
          } else {
            this.$store.commit('setDiary', false)
          }
          if (response.data.community) {
            this.$store.commit('setCommunity', true)
          } else {
            this.$store.commit('setCommunity', false)
          }
          if (response.data.media) {
            this.$store.commit('setMedia', true)
          } else {
            this.$store.commit('setMedia', false)
          }
          if (response.data.practice) {
            this.$store.commit('setPractice', true)
          } else {
            this.$store.commit('setPractice', false)
          }
          if (response.data.blog) {
            this.$store.commit('setBlogs', true)
          } else {
            this.$store.commit('setBlogs', false)
          }
          if ((response.data.reminders) && (response.data.reminders.length)) {
            this.$store.commit('setReminders', true)
          } else {
            this.$store.commit('setReminders', false)
          }
          if (response.data.sermon) {
            this.$store.commit('setSermons', true)
          } else {
            this.$store.commit('setSermons', false)
          }
          if (this.phoneverified && this.$store.state.token) {
            this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
            this.$axios.post(process.env.API + '/phone',
              {
                phone: localStorage.getItem('JOURNEY_VerifiedPhone'),
                society_id: localStorage.getItem('JOURNEY_Society')
              })
              .then(response => {
                if (response.data.individual) {
                  this.$store.commit('setIndividual', response.data.individual)
                  if (!localStorage.getItem('JOURNEY_Individual')) {
                    localStorage.setItem('JOURNEY_Individual', JSON.stringify(response.data.individual))
                  }
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
          this.$q.loading.hide()
        })
        .catch(function (error) {
          console.log(error)
          // this.$q.loading.hide()
        })
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
</style>
