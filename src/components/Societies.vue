<template>
  <div>
    <q-list class="no-border">
      <q-item v-if="societies" v-for="society in societies" :key="society.id" :to="'/societies/' + society.id">
        <q-item-main>
          {{society.society}}
        </q-item-main>
        <q-item-side class="text-right">
          <p v-for="service in society['services']" :key="service.id">
            <span v-if="service.preacher">
              <small>{{service.preacher.title}} {{service.preacher.firstname}} {{service.preacher.surname}}&nbsp;
                <span v-if="service.servicetype"><b>{{service.servicetype}}</b></span>
              </small>
            </span>&nbsp;&nbsp;<b>{{service.servicetime}}</b>
          </p>
        </q-item-side>
      </q-item>
      <p class="text-center q-mt-lg" v-if="!anysocieties">No societies have been added for this circuit</p>
    </q-list>
    <q-btn v-if="isAuthorised" round color="primary" @click="addSociety" class="fixed" icon="add" style="right: 18px; bottom: 68px" />
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
    anysocieties () {
      return this.societies.length
    },
    isAuthorised () {
      if (localStorage.getItem('JOURNEY_VerifiedPhone')) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    // this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.profile.token
    this.$axios.get(this.$store.state.hostname + '/methodist/circuits/' + this.$store.state.circuitid + '/societies/thisweek')
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
