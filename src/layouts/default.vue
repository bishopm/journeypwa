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
          <q-item to="/signup">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-pen-alt" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>Sign up</q-item-label>
              <q-item-label caption>Join a group/service team </q-item-label>
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
          <q-item v-if="$store.state.token" to="/help">
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-fw fa-info" />
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>Help</q-item-label>
              <q-item-label caption>Send feedback / get help</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <div v-if="!phoneverified" class="text-center q-ma-md">
        <q-btn color="secondary" to="phoneverification">Please verify your phone number</q-btn>
        <q-btn class="q-ml-sm" label="Why?" color="primary" @click="persistent = true" />
        <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-primary text-white">
            <q-card-section>
              You don't have to verify your number, but if you do, you'll be able to:<br><br>
              <li>update your contact details,</li>
              <li>sign up for events*,</li>
              <li>view profile pictures of members of your congregation*</li>
              <li>receive reminders when you are on duty or preaching on a Sunday*, and</li>
              <li>view your personal giving records.*</li>
              <li>In addition, you can subscribe to additional blogs / sermon podcasts</li><br>
              <small>*these features assume that someone in your church is set up as an administrator using the ChurchNet system.</small>
            </q-card-section>
            <q-card-actions align="center" class="bg-white text-teal">
              <q-btn flat label="OK" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <div v-else>
        <div v-if="!society" class="text-center q-ma-md">
          <q-btn @click="socmodal = true" color="secondary">Which church do you belong to?</q-btn>
        </div>
        <div v-else-if="loading" class="text-center bg-grey-4 text-white">
          <div v-if="!offerrefresh" class="q-pa-md" transition-hide="fade">
            Checking for new content <q-spinner-bars class="q-ml-sm" size="20px" color="white" />
          </div>
          <div v-else class="q-py-md text-black">Switching to latest content in {{countdown}}s</div>
        </div>
        <div v-if="noindiv && society && !$q.localStorage.getItem('JOURNEY_Individual')">
          <div class="text-center q-ma-md">
            Welcome, {{phoneverified}}<br>
            <q-btn @click="noindiv = false" to="adduser" color="secondary">Update my details</q-btn>
          </div>
        </div>
        <q-dialog v-model="socmodal" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-primary text-white" style="width: 400px">
            <q-card-section>
              <div class="text-h6">Find your church</div>
            </q-card-section>
            <q-card-section class="bg-white">
              <div class="q-gutter-md row">
                <q-select outlined v-model="church" label="Church" :options="[{label: 'Methodist Church of Southern Africa', value: 'mcsa'}]" style="width:100%;" emit-value map-options/>
                <q-select autofocus placeholder="Type here to find or change your church" outlined v-model="mySociety" use-input input-debounce="0" :options="filteredSocieties" @filter="filterFn" clearable style="width:100%;">
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </q-card-section>
            <q-card-actions align="right" class="bg-white text-black">
              <q-btn class="bg-white text-primary" to="addchurch" flat label="I can't find my church" v-close-popup/>
              <q-btn class="bg-grey text-white" flat label="Cancel" v-close-popup/>
              <q-btn class="bg-primary text-white" flat label="OK" @click="setSociety"/>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <router-view />
    </q-page-container>
    <q-footer>
      <div class="text-center bg-black">
        <small v-if="$store.state.individual.firstname" class="text-bold">{{$store.state.individual.firstname}} {{$store.state.individual.surname}} - </small>
        <small v-if="$store.state.societyname">{{$store.state.societyname}} ({{$store.state.circuitname}})
        </small>
        <router-link to="/settings" class="text-white text-bold" style="text-decoration:none;"><q-icon v-if="$store.state.societyname" size="12px" name="fa fa-cog"></q-icon></router-link>
      </div>
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
      loading: false,
      offerrefresh: false,
      individual: '',
      expanded: true,
      countdown: 3,
      newdata: [],
      menus: ['blog', 'devotional', 'diary', 'events', 'groups', 'media', 'practice', 'reminders', 'sermon'],
      persistent: false,
      socmodal: false,
      societies: [],
      filteredSocieties: [],
      denomination: 1,
      mySociety: null,
      noindiv: false,
      church: 'mcsa'
    }
  },
  computed: {
    society () {
      if (this.$q.localStorage.getItem('JOURNEY_Society')) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    // First, deal with possible upgrades
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

    // Settings housekeeping - populating store
    if (!this.$q.localStorage.getItem('JOURNEY_Individual')) {
      this.noindiv = true
    }
    if (this.$q.localStorage.getItem('JOURNEY_Circuit')) {
      this.$store.commit('setSocietyName', this.$q.localStorage.getItem('JOURNEY_Societyname'))
      this.$store.commit('setSocietyId', this.$q.localStorage.getItem('JOURNEY_Society'))
      this.$store.commit('setCircuitId', this.$q.localStorage.getItem('JOURNEY_Circuit'))
      this.$store.commit('setCircuitName', this.$q.localStorage.getItem('JOURNEY_Circuitname'))
    }
    if (this.$q.localStorage.getItem('JOURNEY_VerifiedPhone')) {
      if (!this.$q.localStorage.getItem('JOURNEY_Token')) {
        this.get_token()
      } else {
        this.$store.commit('setToken', this.$q.localStorage.getItem('JOURNEY_Token'))
        this.getindiv()
      }
    }
  },
  methods: {
    get_token () {
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
        .catch(error => {
          if (error.code === 'ECONNABORTED') {
            this.$q.notify('Server connection timed out - are you offline?')
          } else {
            console.log(error)
          }
        })
    },
    updateFeed () {
      this.$store.commit('setFeeditems', this.newdata)
      for (var mndx in this.menus) {
        if (this.newdata[this.menus[mndx]]) {
          this.$store.commit('setMenu', [this.menus[mndx], true])
        } else {
          this.$store.commit('setMenu', [this.menus[mndx], false])
        }
      }
      this.offerrefresh = false
      this.loading = false
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
      this.loading = true
      this.$axios.post(process.env.API + '/userfeed',
        {
          society: this.$store.state.societyid,
          individual: this.$store.state.individual.id
        })
        .then(response => {
          this.$q.localStorage.set('JOURNEY_User', response.data.userid)
          this.newdata = response.data
          if (JSON.stringify(this.newdata) !== JSON.stringify(this.$store.state.feeditems)) {
            this.offerrefresh = true
            setTimeout(() => {
              this.countdown = 2
              setTimeout(() => {
                this.countdown = 1
                setTimeout(() => {
                  this.countdown = 0
                  this.updateFeed()
                }, 1000)
              }, 1000)
            }, 1000)
          } else {
            this.offerrefresh = false
            this.loading = false
          }
        })
        .catch(error => {
          if (error.code === 'ECONNABORTED') {
            this.loading = false
            this.$q.notify('Server connection timed out - are you offline?')
          } else {
            console.log(error)
          }
        })
    },
    getSocieties () {
      this.$axios.get(process.env.API + '/denominations/' + this.denomination + '/societies')
        .then(response => {
          for (var soc in response.data) {
            this.societies.push({
              label: response.data[soc].society + ' (' + response.data[soc].circuit + ', ' + response.data[soc].district + ')',
              value: response.data[soc].society_id,
              society: response.data[soc].society,
              circuit: response.data[soc].circuit,
              circuit_id: response.data[soc].circuit_id,
              district: response.data[soc].district_id
            })
          }
        })
        .catch(error => {
          if (error.code === 'ECONNABORTED') {
            this.$q.notify('Server connection timed out - are you offline?')
          } else {
            console.log(error)
          }
        })
    },
    setSociety () {
      this.socmodal = false
      this.$q.localStorage.set('JOURNEY_Societyname', this.mySociety.society)
      this.$q.localStorage.set('JOURNEY_Circuitname', this.mySociety.circuit)
      this.$q.localStorage.set('JOURNEY_Society', this.mySociety.value)
      this.$q.localStorage.set('JOURNEY_Circuit', this.mySociety.circuit_id)
      this.$q.localStorage.set('JOURNEY_District', this.mySociety.district)
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
      this.$axios.post(process.env.API + '/phone',
        {
          phone: this.$q.localStorage.getItem('JOURNEY_VerifiedPhone'),
          society_id: this.$q.localStorage.getItem('JOURNEY_Society')
        })
        .then(response => {
          if (response.data.individual) {
            if (!this.$q.localStorage.getItem('JOURNEY_Individual')) {
              this.$q.localStorage.set('JOURNEY_Individual', JSON.stringify(response.data.individual))
            }
          }
          window.location.reload()
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            localStorage.removeItem('JOURNEY_Token')
            window.location.reload()
          } else {
            console.log(error)
          }
        })
    },
    filterFn (val, update, abort) {
      if (val.length < 2) {
        abort()
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.filteredSocieties = this.societies.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
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
            this.$q.localStorage.set('JOURNEY_Individual', JSON.stringify(response.data.individual))
            this.noindiv = false
          } else {
            localStorage.removeItem('JOURNEY_Individual')
            this.noindiv = true
          }
          if (this.$store.state.societyid) {
            this.getfeedcontent()
          } else {
            this.getSocieties()
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
