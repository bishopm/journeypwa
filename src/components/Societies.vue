<template>
  <div>
    <q-list v-if="societies" class="no-border">
      <q-item-label header class="text-center">Services this Sunday: {{sunday}}</q-item-label>
      <q-item v-for="society in societies" :key="society.id" :to="'/societies/' + society.id">
        <q-item-section>
          <q-item-label>
            {{society.society}}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <p v-for="service in society['services']" :key="service.id">
            <span v-if="service.person">
              <small>{{service.person.title}} {{service.person.firstname}} {{service.person.surname}}&nbsp;
                <span v-if="service.servicetype"><b>{{service.servicetype}}</b></span>
              </small>
            </span>&nbsp;&nbsp;<b>{{service.servicetime}}</b>
          </p>
        </q-item-section>
      </q-item>
      <p class="text-center q-mt-lg" v-if="!societies">No societies have been added for this circuit</p>
    </q-list>
  </div>
</template>

<script>
import saveState from 'vue-save-state'
export default {
  data () {
    return {
      societies: [],
      search: '',
      sunday: ''
    }
  },
  mixins: [saveState],
  computed: {
    isAuthorised () {
      if (localStorage.getItem('JOURNEY_VerifiedPhone')) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    if (!this.$store.state.feeditems) {
      this.$router.push({ name: 'home' })
    }
    // this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    this.$axios.get(process.env.API + '/circuits/' + this.$store.state.circuitid + '/societies/thisweek')
      .then(response => {
        this.societies = response.data.societies
        this.sunday = response.data.sunday
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    getSaveStateConfig () {
      return {
        'cacheKey': 'JOURNEY_Societies'
      }
    },
    addSociety () {
      this.$router.push({ name: 'addsociety' })
    }
  }
}
</script>

<style>
p {
  margin-bottom: 0px;
}
</style>
