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
      <q-field icon="place" label="Society" class="q-my-md">
        <q-select @input="chooseSociety" placeholder="Select a society" v-model="society" :options="societyOptions"/>
      </q-field>
      <q-btn v-if="!phone && circuit" color="secondary" label="Click here to set up notifications (eg: preaching/meeting reminders)" :to="{ name: 'verification' }"/>
    </form>
  </div>
</template>

<script>
import saveState from 'vue-save-state'
export default {
  data () {
    return {
      churchOptions: [{ label: 'Methodist Church of Southern Africa', value: 'mcsa' }],
      circuitOptions: [],
      districtOptions: [],
      societyOptions: [],
      bible: 'eng-GNTUK',
      church: 'mcsa',
      district: 0,
      circuit: {},
      society: {},
      phone: ''
    }
  },
  mixins: [saveState],
  computed: {
    notifications () {
      if (localStorage.getItem('JOURNEY_Phonenumber')) {
        return 1
      } else {
        return 0
      }
    }
  },
  methods: {
    getSaveStateConfig () {
      return {
        'cacheKey': 'JOURNEY_Settings'
      }
    },
    populateDistricts () {
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
        })
        .catch(function (error) {
          console.log(error)
        })
    },
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
      this.$axios.get(this.$store.state.hostname + '/methodist/circuits/' + this.circuit.id + '/societies')
        .then(response => {
          this.societyOptions = []
          for (var skey in response.data) {
            var newitem = {
              label: response.data[skey].society,
              value: { id: response.data[skey].id, name: response.data[skey].society }
            }
            this.societyOptions.push(newitem)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    chooseSociety () {
      localStorage.setItem('JOURNEY_Society', JSON.stringify(this.society))
      this.$store.commit('setSocietyId', this.society.id)
      this.$store.commit('setSocietyName', this.society.name)
    },
    chooseTranslation () {
      localStorage.setItem('JOURNEY_Bible', JSON.stringify(this.bible))
    }
  },
  mounted () {
    if (!localStorage.getItem('JOURNEY_Bible')) {
      localStorage.setItem('JOURNEY_Bible', this.bible)
    }
    if (localStorage.getItem('JOURNEY_VerifiedPhone')) {
      this.phone = localStorage.getItem('JOURNEY_VerifiedPhone')
    }
    if (!localStorage.getItem('JOURNEY_District')) {
      this.populateDistricts()
    } else {
      for (var ckey in this.circuitOptions) {
        if (this.circuit.value.number === this.circuitOptions[ckey].value.number) {
          this.circuit = this.circuitOptions[ckey].value
        }
      }
      for (var skey in this.societyOptions) {
        if (this.society.value.name === this.societyOptions[skey].value.name) {
          this.society = this.societyOptions[skey].value
        }
      }
    }
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
