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
    </form>
    <div class="text-center" v-if="society > 0">
      <q-btn class="q-my-md" color="secondary" to="/">All done! Back to home page</q-btn>
    </div>
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
      district: null,
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
      this.$axios.get(this.$store.state.hostname + '/districts')
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
      this.$axios.get(this.$store.state.hostname + '/districts/' + this.district)
        .then(response => {
          this.circuitOptions = []
          for (var ckey in response.data) {
            var newitem = {
              label: response.data[ckey].circuitnumber + ' ' + response.data[ckey].circuit,
              value: response.data[ckey].id
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
      localStorage.setItem('JOURNEY_Circuit', this.circuit)
      for (var ckey in this.circuitOptions) {
        if (this.circuit === this.circuitOptions[ckey].value) {
          localStorage.setItem('JOURNEY_Circuitname', this.circuitOptions[ckey].label)
        }
      }
      this.$store.commit('setCircuitName', localStorage.getItem('JOURNEY_Circuitname'))
      this.$store.commit('setCircuitId', this.circuit)
      this.$axios.get(this.$store.state.hostname + '/circuits/' + this.circuit + '/societies')
        .then(response => {
          this.societyOptions = []
          for (var skey in response.data) {
            var newitem = {
              label: response.data[skey].society,
              value: response.data[skey].id
            }
            this.societyOptions.push(newitem)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    chooseSociety () {
      localStorage.setItem('JOURNEY_Society', this.society)
      for (var skey in this.societyOptions) {
        if (this.society === this.societyOptions[skey].value) {
          localStorage.setItem('JOURNEY_Societyname', this.societyOptions[skey].label)
        }
      }
      this.$store.commit('setSocietyId', this.society)
      this.$store.commit('setSocietyName', localStorage.getItem('JOURNEY_Societyname'))
    },
    chooseTranslation () {
      localStorage.setItem('JOURNEY_Bible', JSON.stringify(this.bible))
    }
  },
  mounted () {
    if (localStorage.getItem('JOURNEY_District')) {
      this.populateDistricts()
      this.district = parseInt(localStorage.getItem('JOURNEY_District'))
      this.chooseDistrict()
    }
    if (localStorage.getItem('JOURNEY_Circuit')) {
      this.circuit = parseInt(localStorage.getItem('JOURNEY_Circuit'))
      this.chooseCircuit()
    }
    if (localStorage.getItem('JOURNEY_Society')) {
      this.society = parseInt(localStorage.getItem('JOURNEY_Society'))
      this.chooseSociety()
    }
    if (!localStorage.getItem('JOURNEY_Bible')) {
      localStorage.setItem('JOURNEY_Bible', this.bible)
    }
    if (localStorage.getItem('JOURNEY_VerifiedPhone')) {
      this.phone = localStorage.getItem('JOURNEY_VerifiedPhone')
    }
    if (!localStorage.getItem('JOURNEY_District')) {
      this.populateDistricts()
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
