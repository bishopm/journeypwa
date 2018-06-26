<template>
  <div class="layout-padding">
    <h3 class="text-center">App settings</h3>
    <form>
      <q-field icon="book" label="Bible version" class="q-my-md">
        <q-option-group @input="chooseTranslation" type="radio" placeholder="Choose a Bible version" v-model="bible" :options="[{ label: 'Good News Translation', value: 'eng-GNTUK' } ]"/>
      </q-field>
      <q-field icon="games" label="Church" class="q-my-md">
        <q-select placeholder="Select church" v-model="church" :options="churchOptions"/>
      </q-field>
      <q-field icon="language" label="District" class="q-my-md">
        <q-select @input="chooseDistrict" placeholder="Select a district" v-model="district" :options="districtOptions"/>
      </q-field>
      <q-field icon="group" label="Circuit" class="q-my-md">
        <q-select @input="chooseCircuit" placeholder="Select a circuit" v-model="circuit" :options="circuitOptions"/>
      </q-field>
      <q-btn v-if="!phone && circuit" color="secondary" label="Click here to set up notifications (eg: preaching/meeting reminders)" :to="{ name: 'verification' }"/>
      <div v-else>
        <h3 class="text-center q-pt-md">Personal details</h3>
        <table class="table">
          <tr>
            <th class="text-left">Phone</th><td>{{phone}}</td>
          </tr>
          <tr v-if="individual">
            <th class="text-left">Name</th><td>{{individual.title}} {{individual.firstname}} {{individual.surname}}</td>
          </tr>
          <tr v-else><th>If you are a minister or preacher, your personal details will appear here once your circuit adds your phone number to their list of preachers</th></tr>
          <tr v-if="individual">
            <th class="text-left">Status</th><td>{{individual.status}}</td>
          </tr>
          <tr v-if="society && individual.status !== 'Minister'">
            <th class="text-left">Society</th><td>{{society.society}}</td>
          </tr>
        </table>
        <q-list v-if="upcoming && upcoming.length" class="q-mt-md text-center no-border">
          <q-list-header>Upcoming preaching appointments</q-list-header>
          <q-item v-for="(plan,pdate) in upcoming" :key="plan.id">
            <q-item-side class="text-left">{{pdate}}</q-item-side>
            <q-item-main><p v-for="pp in plan" :key="pp.id"><small>{{pp.society}} ({{pp.servicetime}})</small></p></q-item-main>
          </q-item>
        </q-list>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      circuitOptions: [],
      districtOptions: [],
      churchOptions: [{ label: 'Methodist Church of Southern Africa', value: 'mcsa' }],
      bible: 'eng-GNTUK',
      church: 'mcsa',
      district: 0,
      circuit: {},
      phone: ''
    }
  },
  computed: {
    notifications () {
      if (localStorage.getItem('JOURNEY_Phonenumber')) {
        return 1
      } else {
        return 0
      }
    },
    society () {
      if (this.$store.state.individual.society) {
        return this.$store.state.individual.society
      } else {
        return false
      }
    },
    upcoming () {
      if (this.$store.state.individual.upcoming) {
        return this.$store.state.individual.upcoming
      } else {
        return false
      }
    },
    individual () {
      if (this.$store.state.individual) {
        return this.$store.state.individual
      } else {
        return false
      }
    }
  },
  methods: {
    chooseDistrict () {
      this.$axios.get(this.$store.state.hostname + '/methodist/districts/' + this.district)
        .then(response => {
          this.circuitOptions = []
          for (var ckey in response.data) {
            var newitem = {
              label: response.data[ckey].circuitnumber + ' ' + response.data[ckey].circuit,
              value: { id: response.data[ckey].id, number: response.data[ckey].circuitnumber, name: response.data[ckey].circuit }
            }
            this.circuitOptions.push(newitem)
          }
          localStorage.setItem('JOURNEY_District', this.district)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    chooseCircuit () {
      localStorage.setItem('JOURNEY_Circuit', JSON.stringify(this.circuit))
      this.$store.commit('setCircuitName', this.circuit.name)
      this.$store.commit('setCircuitId', this.circuit.id)
    },
    chooseTranslation () {
      localStorage.setItem('JOURNEY_Bible', JSON.stringify(this.bible))
    }
  },
  mounted () {
    // this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.profile.token
    if (localStorage.getItem('JOURNEY_District')) {
      this.district = parseInt(localStorage.getItem('JOURNEY_District'))
    }
    if (localStorage.getItem('JOURNEY_Circuit')) {
      this.circuit = JSON.parse(localStorage.getItem('JOURNEY_Circuit'))
    }
    if (localStorage.getItem('JOURNEY_VerifiedPhone')) {
      this.phone = localStorage.getItem('JOURNEY_VerifiedPhone')
    }
    this.$axios.get(this.$store.state.hostname + '/methodist/districts')
      .then(response => {
        this.districtOptions = []
        for (var dkey in response.data) {
          var newitem = {
            label: response.data[dkey].district,
            value: response.data[dkey].id
          }
          this.districtOptions.push(newitem)
        }
        for (var ckey in this.circuitOptions) {
          if (this.circuit.number === this.circuitOptions[ckey].value.number) {
            this.circuit = this.circuitOptions[ckey].value
          }
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
.layout-padding {
  padding-top:0;
}
p {
  margin-bottom: 0;
}
h3 {
  line-height:0px;
}
</style>
