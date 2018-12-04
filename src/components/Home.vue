<template>
  <div class="layout-padding">
    <div class="text-center q-mt-md">
      <q-btn v-if="!phoneverified" color="secondary" to="phoneverification">Verify your phone number</q-btn>
      <div v-else-if="!indivset">
        Your phone number has been verified but we don't have your details in our membership database:
        <q-btn class="q-my-md" color="secondary" to="adduser">Add your member details</q-btn>
      </div>
    </div>
    <div class="row q-mt-lg">
      <div class="col-6 text-center q-mb-md">
        <div class="q-mb-sm caption">Sunday's readings</div>
        <router-link to="/sunday" class="text-white" style="text-decoration:none;">
          <q-icon class="text-primary" name="fas fa-fw fa-bible" size="5rem" />
        </router-link>
      </div>
      <div class="col-6 text-center q-mb-md">
        <div class="q-mb-sm caption">Faith for daily living</div>
        <router-link to="/ffdl" class="text-white" style="text-decoration:none;">
          <q-icon class="text-primary" name="fas fa-fw fa-pray" size="6rem" />
        </router-link>
      </div>
      <div v-if="grace" class="col-6 text-center q-mb-md">
        <div class="q-mb-sm caption">Grace</div>
        <router-link to="/grace" class="text-white" style="text-decoration:none;">
          <q-icon class="text-primary" name="fas fa-fw fa-gift" size="5rem" />
        </router-link>
      </div>
      <div v-if="menu_blogs()" class="col-6 text-center q-mb-md">
        <router-link to="/blogs" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Blog</div>
          <q-icon class="text-primary" name="fas fa-fw fa-edit" size="5rem" />
        </router-link>
      </div>
      <div v-if="menu_sermons()" class="col-6 text-center q-mb-md">
        <router-link to="/sermons" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Sermon</div>
          <q-icon class="text-primary" name="fas fa-fw fa-microphone" size="5rem" />
        </router-link>
      </div>
      <div v-if="menu_media()" class="col-6 text-center q-mb-md">
        <router-link to="/content/media" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Media / articles</div>
          <q-icon class="text-primary" name="fas fa-fw fa-images" size="5rem" />
        </router-link>
      </div>
      <div v-if="menu_groups()" class="col-6 text-center q-mb-md">
        <router-link to="/content/groups" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Small groups</div>
          <q-icon class="text-primary" name="fas fa-fw fa-users" size="5rem" />
        </router-link>
      </div>
      <div v-if="menu_practice()" class="col-6 text-center q-mb-md">
        <router-link to="/content/practice" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Practical exercise</div>
          <q-icon class="text-primary" name="fas fa-fw fa-praying-hands" size="5rem" />
        </router-link>
      </div>
      <div v-if="menu_birthdays()" class="col-6 text-center q-mb-md">
        <div>Community news</div>
        <q-icon class="q-mb-sm text-primary" name="fas fa-fw fa-user-friends" size="5rem" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phoneverified: localStorage.getItem('JOURNEY_VerifiedPhone'),
      token: '',
      grace: false,
      params: this.$route.params
    }
  },
  async mounted () {
    if (this.params.district) {
      localStorage.setItem('JOURNEY_District', this.params.district)
      localStorage.setItem('JOURNEY_Bible', 'eng-GNTUK')
      if (this.params.circuit) {
        localStorage.setItem('JOURNEY_Circuit', this.params.circuit)
        this.$axios.get(process.env.API + '/circuits/' + this.params.circuit + '/withsocieties')
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
    }
  },
  methods: {
    indivset () {
      if (this.$store.state.individual) {
        return true
      }
    },
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
  }
}
</script>

<style>
</style>
