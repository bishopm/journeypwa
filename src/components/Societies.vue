<template>
  <div>
    <q-list class="no-border">
      <q-item v-if="societies" v-for="society in societies" :key="society.id" :to="'/societies/' + society.id">
        <q-item-main>
          {{society.society}}
        </q-item-main>
        <q-item-side class="text-right">
          <p v-for="service in society['services']" :key="service.id">
            <span v-if="service.person">
              <small>{{service.person.title}} {{service.person.firstname}} {{service.person.surname}}&nbsp;
                <span v-if="service.servicetype"><b>{{service.servicetype}}</b></span>
              </small>
            </span>&nbsp;&nbsp;<b>{{service.servicetime}}</b>
          </p>
        </q-item-side>
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
      search: ''
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
    // this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    this.$axios.get(process.env.API + '/circuits/' + this.$store.state.circuitid + '/societies/thisweek')
      .then(response => {
        this.societies = response.data
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
