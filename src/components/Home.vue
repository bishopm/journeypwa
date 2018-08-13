<template>
  <div class="layout-padding">
    <div class="text-center q-mt-md">
      <q-btn v-if="!phoneverified" color="secondary" to="phoneverification">Verify your phone number</q-btn>
      <div v-else-if="!individual">
        Your phone number has been verified but we don't have your details in our membership database:
        <q-btn class="q-my-md" color="secondary" to="adduser">Add your member details</q-btn>
      </div>
    </div>
    <div class="row q-mt-lg">
      <div class="col-6 text-center q-mb-md">
        <div>Sunday's readings</div>
        <router-link to="/sunday" class="text-white" style="text-decoration:none;">
          <q-icon class="text-primary" name="book" size="6rem" />
        </router-link>
      </div>
      <div class="col-6 text-center q-mb-md">
        <div>Faith for daily living</div>
        <router-link to="/ffdl" class="text-white" style="text-decoration:none;">
          <q-icon class="text-primary" name="games" size="6rem" />
        </router-link>
      </div>
      <div v-if="menu_blogs()" class="col-6 text-center q-mb-md">
        <router-link to="/blogs" class="text-white" style="text-decoration:none;">
          <div class="text-black">Blog</div>
          <q-icon class="text-primary" name="create" size="6rem" />
        </router-link>
      </div>
      <div v-if="menu_sermons()" class="col-6 text-center q-mb-md">
        <router-link to="/sermons" class="text-white" style="text-decoration:none;">
          <div class="text-black">Sermon</div>
          <q-icon class="text-primary" name="mic" size="6rem" />
        </router-link>
      </div>
      <div v-if="menu_media()" class="col-6 text-center q-mb-md">
        <router-link to="/content/media" class="text-white" style="text-decoration:none;">
          <div class="text-black">Media / articles</div>
          <q-icon class="text-primary" name="art_track" size="6rem" />
        </router-link>
      </div>
      <div v-if="menu_groups()" class="col-6 text-center q-mb-md">
        <router-link to="/content/groups" class="text-white" style="text-decoration:none;">
          <div class="text-black">Small groups</div>
          <q-icon class="text-primary" name="group" size="6rem" />
        </router-link>
      </div>
      <div v-if="menu_practice()" class="col-6 text-center q-mb-md">
        <router-link to="/content/practice" class="text-white" style="text-decoration:none;">
          <div class="text-black">Practical exercise</div>
          <q-icon class="text-primary" name="pan_tool" size="6rem" />
        </router-link>
      </div>
      <div v-if="menu_birthdays()" class="col-6 text-center q-mb-md">
        <div>Community news</div>
        <q-icon class="text-primary" name="people_outline" size="6rem" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phoneverified: localStorage.getItem('JOURNEY_VerifiedPhone'),
      user: {},
      token: '',
      params: this.$route.params
    }
  },
  async mounted () {
    if (this.params.district) {
      localStorage.setItem('JOURNEY_District', this.params.district)
      localStorage.setItem('JOURNEY_Bible', 'eng-GNTUK')
      if (this.params.circuit) {
        localStorage.setItem('JOURNEY_Circuit', this.params.circuit)
        this.$axios.get(this.$store.state.hostname + '/circuits/' + this.params.circuit + '/withsocieties')
          .then(response => {
            localStorage.setItem('JOURNEY_Circuitname', response.data.circuitnumber + ' ' + response.data.circuit)
            if (this.params.society) {
              localStorage.setItem('JOURNEY_Society', this.params.society)
              for (var skey in response.data.societies) {
                if (parseInt(response.data.societies[skey].id) === parseInt(this.params.society)) {
                  localStorage.setItem('JOURNEY_Societyname', response.data.societies[skey].society)
                }
              }
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
    if (!localStorage.getItem('JOURNEY_Society')) {
      this.$router.push({ name: 'settings' })
    } else {
      if (!localStorage.getItem('JOURNEY_Token')) {
        if (localStorage.getItem('JOURNEY_VerifiedPhone')) {
          this.$axios.post(this.$store.state.hostname + '/login',
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
      } else {
        this.$store.commit('setToken', localStorage.getItem('JOURNEY_Token'))
      }
      this.$store.commit('setSocietyName', localStorage.getItem('JOURNEY_Societyname'))
      this.$store.commit('setSocietyId', localStorage.getItem('JOURNEY_Society'))
      if (localStorage.getItem('JOURNEY_Circuit')) {
        this.$store.commit('setCircuitId', localStorage.getItem('JOURNEY_Circuit'))
        this.$store.commit('setCircuitName', localStorage.getItem('JOURNEY_Circuitname'))
      }
      this.$axios.get(this.$store.state.hostname + '/feeditems/' + this.$store.state.societyid)
        .then(response => {
          this.$store.commit('setFeeditems', response.data)
          if (response.data.groups) {
            this.$store.commit('setGroups', true)
          } else {
            this.$store.commit('setGroups', false)
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
          if (response.data.sermon) {
            this.$store.commit('setSermons', true)
          } else {
            this.$store.commit('setSermons', false)
          }
          if (this.phoneverified && this.$store.state.token) {
            this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
            this.$axios.post(this.$store.state.hostname + '/phone',
              {
                phone: localStorage.getItem('JOURNEY_VerifiedPhone'),
                society_id: localStorage.getItem('JOURNEY_Society')
              })
              .then(response => {
                if (response.data.household) {
                  this.$store.commit('setIndividual', response.data)
                  this.$store.commit('setChats', response.data.chats)
                }
              })
              .catch(function (error) {
                console.log(error)
              })
          }
        })
        .catch(function (error) {
          console.log(error)
          // this.$q.loading.hide()
        })
    }
  },
  methods: {
    menu_media () {
      return this.$store.state.menu_media
    },
    menu_groups () {
      return this.$store.state.menu_groups
    },
    menu_birthdays () {
      return this.$store.state.menu_birthdays
    },
    menu_practice () {
      return this.$store.state.menu_practice
    },
    menu_blogs () {
      return this.$store.state.menu_blogs
    },
    menu_sermons () {
      return this.$store.state.menu_sermons
    }
  },
  computed: {
    individual () {
      if (this.$store.state.individual.id) {
        return true
      }
    }
  }
}
</script>

<style>
</style>
