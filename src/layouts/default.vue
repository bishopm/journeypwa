<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="black" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-toolbar-title>
          <router-link to="/" class="text-white" style="text-decoration:none;"><q-icon size="1.2rem" class="q-mb-xs fas" name="fas fa-hiking" color="white"/> Journey</router-link>
          <div class="q-ml-xs" slot="subtitle">together on the way</div>
        </q-toolbar-title>
        <q-btn flat dense round @click="rightDrawerOpen = !rightDrawerOpen" aria-label="Menu">
          <q-icon name="fas fa-bars" />
        </q-btn>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer side="right" v-model="rightDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <q-list no-border link inset-delimiter>
        <q-collapsible v-if="societyname()" opened class="text-center society" :label="societyname() + ' Society'">
          <q-item v-if="messages()" to="/messages">
            <q-item-side icon="message" />
            <q-item-main :label="'Messages: ' + messages()" sublabel="Inbox messages" />
          </q-item>
          <q-item v-if="menu_community()" to="/community">
            <q-item-side icon="people_outline" />
            <q-item-main label="Community" sublabel="Community news and needs" />
          </q-item>
          <q-item to="/ffdl">
            <q-item-side icon="fas fa-fw fa-pray" />
            <q-item-main label="Devotions" sublabel="Faith for daily living" />
          </q-item>
          <q-item v-if="menu_blogs()" to="/blogs">
            <q-item-side icon="fas fa-fw fa-edit" />
            <q-item-main label="Blog" sublabel="From our blog" />
          </q-item>
          <q-item v-if="menu_sermons()" to="/sermons">
            <q-item-side icon="fas fa-fw fa-microphone" />
            <q-item-main label="Sermon" sublabel="Last week's sermon" />
          </q-item>
          <q-item to="/diary">
            <q-item-side icon="fas fa-fw fa-calendar-alt" />
            <q-item-main label="Calendar" sublabel="Events for your diary" />
          </q-item>
          <q-item v-if="menu_groups()" to="/content/groups">
            <q-item-side icon="fas fa-fw fa-users" />
            <q-item-main label="Groups" sublabel="Small group material" />
          </q-item>
          <q-item v-if="menu_media()" to="/content/media">
            <q-item-side icon="fas fa-fw fa-images" />
            <q-item-main label="Extra" sublabel="Media / articles" />
          </q-item>
          <q-item v-if="menu_practice()" to="/content/practice">
            <q-item-side icon="fas fa-fw fa-praying-hands" />
            <q-item-main label="Practice" sublabel="Practice or discipline for the week" />
          </q-item>
          <q-item to="/library">
            <q-item-side icon="fas fa-fw fa-warehouse" />
            <q-item-main label="Resources" sublabel="Resource library" />
          </q-item>
          <q-item to="/sunday">
            <q-item-side icon="fas fa-fw fa-bible" />
            <q-item-main label="Sunday" sublabel="Lectionary readings for Sunday" />
          </q-item>
        </q-collapsible>
        <q-collapsible v-if="circuitname()" class="text-center circuit" :label="circuitname() || 'Circuit'">
          <q-item to="/societies">
            <q-item-side icon="fas fa-fw fa-church" />
            <q-item-main label="Services this Sunday" sublabel="Societies and preachers" />
          </q-item>
        </q-collapsible>
        <q-collapsible class="text-center administration" label="App administration">
          <q-item to="/settings">
            <q-item-side icon="fas fa-fw fa-cogs" />
            <q-item-main label="Settings" sublabel="App settings" />
          </q-item>
          <q-item to="/me">
            <q-item-side icon="fas fa-fw fa-user-cog" />
            <q-item-main label="My details" sublabel="My personal and household details" />
          </q-item>
          <q-item to="/reminders">
            <q-item-side icon="fas fa-fw fa-inbox" />
            <q-item-main label="My inbox" sublabel="Messages and notifications" />
          </q-item>
        </q-collapsible>
      </q-list>
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-layout-footer>
      <q-toolbar class="justify-around">
        <q-item class="text-center" to="/home">
          <q-item-side icon="fas fa-home" color="white"/>
        </q-item>
        <q-item class="text-center" to="/sunday">
          <q-item-side icon="fas fa-bible" color="white"/>
        </q-item>
        <q-item class="text-center" to="/ffdl">
          <q-item-side icon="fas fa-pray" color="white"/>
        </q-item>
        <q-item class="text-center" to="/me">
          <q-item-side icon="fas fa-user-cog" color="white"/>
        </q-item>
      </q-toolbar>
    </q-layout-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data () {
    return {
      phoneverified: localStorage.getItem('JOURNEY_VerifiedPhone'),
      rightDrawerOpen: this.$q.platform.is.desktop,
      individual: ''
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
    if (this.$store.state.individual) {
      this.individual = this.$store.state.individual.id
    }
    if (localStorage.getItem('JOURNEY_Version')) {
      if (localStorage.getItem('JOURNEY_Version') !== process.env.VERSION) {
        this.$q.dialog({
          title: 'New version available',
          message: 'Click OK to restart the app and upgrade to version ' + process.env.VERSION + '. This new version includes: ' + process.env.VNOTES,
          ok: 'OK',
          cancel: 'LATER'
        }).then(() => {
          localStorage.setItem('JOURNEY_Version', process.env.VERSION)
          window.location.reload()
        }).catch(() => {
          console.log('Delaying upgrade')
        })
      }
    } else {
      localStorage.setItem('JOURNEY_Version', process.env.VERSION)
    }
    this.$store.commit('setSocietyName', localStorage.getItem('JOURNEY_Societyname'))
    this.$store.commit('setSocietyId', localStorage.getItem('JOURNEY_Society'))
    if (localStorage.getItem('JOURNEY_Circuit')) {
      this.$store.commit('setCircuitId', localStorage.getItem('JOURNEY_Circuit'))
      this.$store.commit('setCircuitName', localStorage.getItem('JOURNEY_Circuitname'))
    }
    if (!localStorage.getItem('JOURNEY_Token')) {
      await this.get_token()
    } else {
      this.$store.commit('setToken', localStorage.getItem('JOURNEY_Token'))
    }
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    this.$axios.post(process.env.API + '/feeditemlist',
      {
        society: this.$store.state.societyid,
        individual: this.individual
      })
      .then(response => {
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
              if (response.data.household) {
                this.$store.commit('setIndividual', response.data)
                if (!localStorage.getItem('JOURNEY_Individual')) {
                  localStorage.setItem('JOURNEY_Individual', JSON.stringify(response.data))
                }
                this.$store.commit('setChats', response.data.chats)
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
      })
      .catch(function (error) {
        console.log(error)
        // this.$q.loading.hide()
      })
  }
}
</script>

<style>
a, a:hover {
  text-decoration: none;
}
#q-app > div > div.q-drawer-container > aside > div > div.q-collapsible.q-item-division.relative-position.text-center.society.q-collapsible-cursor-pointer > div > div.q-item.q-item-division.relative-position {
  background-color:#4d7227;
  border-bottom:white solid 2px;
  color: white;
  text-align:center;
}
#q-app > div > div.q-drawer-container > aside > div > div.q-collapsible.q-item-division.relative-position.text-center.circuit.q-collapsible-cursor-pointer > div > div.q-item.q-item-division.relative-position {
  background-color:#81be41;
  border-bottom:white solid 2px;
  color: white;
  text-align:center;
}
#q-app > div > div.q-drawer-container > aside > div > div.q-collapsible.q-item-division.relative-position.text-center.administration.q-collapsible-cursor-pointer > div > div.q-item.q-item-division.relative-position {
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
