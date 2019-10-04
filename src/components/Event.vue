<template>
  <div>
    <div v-if="event && event.group" class="text-center q-ma-md">
      <p class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">{{event.group.groupname}}</p>
      <small>{{event.group.till}}</small>
      <p class="caption">{{event.group.description}}</p>
      <p class="text-left q-mt-md"><b>Date & time:</b> {{formatme(event.group.eventdatetime)}}</p>
      <div class="text-left q-mt-md">
        <b>Attending (so far):</b> {{participantstring}}.
      </div>
      <q-select class="q-mt-md" @input="updateChanges" multiple chips label="Household members signed up" v-model="signups" :options="householdOptions"  map-options emit-value/>
    </div>
    <div class="q-ma-md caption text-center" v-if="!$store.state.token">
      We need to verify your phone number before you can sign up!
      <q-btn class="q-ma-md" color="secondary" to="/phoneverification">Verify my number</q-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      event: {},
      attenders: [],
      householdmembers: {},
      householdOptions: [],
      signups: []
    }
  },
  computed: {
    participantstring () {
      let dumstr = ''
      for (var gkey in this.event.members) {
        dumstr = dumstr + this.event.members[gkey].firstname + ' ' + this.event.members[gkey].surname + ', '
      }
      return dumstr.slice(0, -2)
    }
  },
  methods: {
    formatme (datein) {
      var fin = new Date(datein * 1000)
      return fin.toUTCString().substring(4, 22)
    },
    updateChanges (newVal) {
      for (var sndx in this.signups) {
        this.attenders.push(this.signups[sndx])
      }
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
      this.$axios.post(process.env.API + '/groups/' + this.event.group.id + '/sync',
        {
          members: this.attenders
        })
        .then(response => {
          this.populateData()
        })
        .catch(error => {
          if (error.code === 'ECONNABORTED') {
            this.$q.notify('Server connection timed out - are you offline?')
          } else {
            console.log(error)
          }
        })
    },
    populateData () {
      if (this.$store.state.token) {
        this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
        this.$axios.get(process.env.API + '/groups/' + this.$route.params.id)
          .then((response) => {
            this.event = response.data
            this.householdmembers = {}
            this.householdOptions = []
            this.attenders = []
            this.signups = []
            for (var ikey in this.$store.state.individual.household.individuals) {
              this.householdmembers[this.$store.state.individual.household.individuals[ikey].id] = {
                name: this.$store.state.individual.household.individuals[ikey].firstname + ' ' + this.$store.state.individual.household.individuals[ikey].surname,
                attending: 0
              }
              this.householdOptions.push(
                {
                  value: this.$store.state.individual.household.individuals[ikey].id,
                  label: this.$store.state.individual.household.individuals[ikey].firstname + ' ' + this.$store.state.individual.household.individuals[ikey].surname
                }
              )
            }
            for (var gkey in this.event.members) {
              if (this.event.members[gkey].id in this.householdmembers) {
                this.signups.push(this.event.members[gkey].id)
              } else {
                this.attenders.push(this.event.members[gkey].id)
              }
            }
          })
          .catch(error => {
            if (error.code === 'ECONNABORTED') {
              this.$q.notify('Server connection timed out - are you offline?')
            } else {
              console.log(error)
            }
          })
      }
    }
  },
  mounted () {
    this.populateData()
  }
}
</script>

<style>
</style>
