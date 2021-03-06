<template>
  <div class="q-ma-lg">
    <p class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">App settings (v {{$q.localStorage.getItem('JOURNEY_Version')}})</p>
    <form>
      <q-field class="q-my-md" borderless label="Notifications" stack-label>
        <template v-slot:prepend>
          <q-icon name="fa fa-comment-alt" />
        </template>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">Notification permission: <b>{{webpush}}</b></div>
        </template>
      </q-field>
      <q-select borderless class="q-my-md" label="Bible version" @input="chooseTranslation" v-model="bible" :options="bibleOptions" map-options emit-value>
        <template v-slot:prepend>
          <q-icon name="fas fa-fw fa-bible" />
        </template>
      </q-select>
      <q-select borderless class="q-my-md" label="Church" v-model="church" :options="churchOptions" map-options emit-value>
        <template v-slot:prepend>
          <q-icon name="fas fa-fw fa-church" />
        </template>
      </q-select>
      <q-select borderless class="q-my-md" label="Synod" @input="chooseDistrict" v-model="district" :options="districtOptions" map-options emit-value>
        <template v-slot:prepend>
          <q-icon name="fas fa-fw fa-sitemap" />
        </template>
      </q-select>
      <q-select borderless class="q-my-md" label="Circuit" @input="chooseCircuit" v-model="circuit" :options="circuitOptions" map-options emit-value>
        <template v-slot:prepend>
          <q-icon name="fas fa-fw fa-users" />
        </template>
      </q-select>
      <q-select borderless class="q-my-md" label="Society" @input="chooseSociety" v-model="society" :options="societyOptions" map-options emit-value>
        <template v-slot:prepend>
          <q-icon name="fas fa-fw fa-map-marker-alt" />
        </template>
      </q-select>
    </form>
    <div class="text-center q-mb-md" v-if="society > 0">
      <q-btn class="q-my-md" color="secondary" @click.native="goHome()">Back to home page</q-btn>
    </div>
    <div class="text-center">
      <a target="_blank" href="https://brave.com/chu313"><q-icon size="1.8em" color="black" name="fab fa-chrome" class="q-mr-sm"/><br>
      Download the Brave Browser<br><small>(based on Chrome, but faster, with built-in ad-blocking)</small></a>
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
      bibleOptions: [{ label: 'Contemporary English Version', value: 'CEV' }, { label: 'Good News Translation', value: 'GNT' }, { label: 'King James Version', value: 'KJV' }],
      bible: 'GNT',
      church: 'mcsa',
      district: null,
      circuit: {},
      society: {},
      phone: '',
      webpush: '',
      menus: ['blog', 'devotional', 'diary', 'events', 'groups', 'media', 'practice', 'reminders', 'sermon']
    }
  },
  mixins: [saveState],
  computed: {
    notifications () {
      if (this.$q.localStorage.getItem('JOURNEY_Phonenumber')) {
        return 1
      } else {
        return 0
      }
    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
    },
    getSaveStateConfig () {
      return {
        'cacheKey': 'JOURNEY_Settings'
      }
    },
    populateDistricts () {
      this.$axios.get(process.env.API + '/districts')
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
        .catch(error => {
          if (error.code === 'ECONNABORTED') {
            this.$q.notify('Server connection timed out - are you offline?')
          } else {
            console.log(error)
          }
        })
    },
    chooseDistrict () {
      this.$axios.get(process.env.API + '/districts/' + this.district)
        .then(response => {
          this.circuitOptions = []
          for (var ckey in response.data) {
            var newitem = {
              label: response.data[ckey].circuitnumber + ' ' + response.data[ckey].circuit,
              value: response.data[ckey].id
            }
            this.circuitOptions.push(newitem)
          }
          this.$q.localStorage.set('JOURNEY_District', this.district)
        })
        .catch(error => {
          if (error.code === 'ECONNABORTED') {
            this.$q.notify('Server connection timed out - are you offline?')
          } else {
            console.log(error)
          }
        })
    },
    chooseCircuit () {
      this.$q.localStorage.set('JOURNEY_Circuit', this.circuit)
      for (var ckey in this.circuitOptions) {
        if (this.circuit === this.circuitOptions[ckey].value) {
          this.$q.localStorage.set('JOURNEY_Circuitname', this.circuitOptions[ckey].label)
        }
      }
      this.$store.commit('setCircuitName', this.$q.localStorage.getItem('JOURNEY_Circuitname'))
      this.$store.commit('setCircuitId', this.circuit)
      this.$axios.get(process.env.API + '/circuits/' + this.circuit + '/societies')
        .then(response => {
          this.societyOptions = []
          var inactive = true
          for (var skey in response.data) {
            var newitem = {
              label: response.data[skey].society,
              value: response.data[skey].id
            }
            this.societyOptions.push(newitem)
            if (response.data[skey].id === this.$q.localStorage.getItem('JOURNEY_Society')) {
              inactive = false
            }
          }
          if (inactive) {
            this.societyOptions.push({
              label: this.$q.localStorage.getItem('JOURNEY_Societyname'),
              value: this.$q.localStorage.getItem('JOURNEY_Society')
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
    getfeedcontent () {
      this.$axios.post(process.env.API + '/userfeed',
        {
          society: this.$store.state.societyid,
          individual: this.$store.state.individual.id
        })
        .then(response => {
          this.$q.localStorage.set('JOURNEY_User', response.data.userid)
          this.$store.commit('setFeeditems', response.data)
          for (var mndx in this.menus) {
            if (response.data[this.menus[mndx]]) {
              this.$store.commit('setMenu', [this.menus[mndx], true])
            } else {
              this.$store.commit('setMenu', [this.menus[mndx], false])
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
    },
    chooseSociety () {
      this.$q.localStorage.set('JOURNEY_Society', this.society)
      for (var skey in this.societyOptions) {
        if (this.society === this.societyOptions[skey].value) {
          this.$q.localStorage.set('JOURNEY_Societyname', this.societyOptions[skey].label)
        }
      }
      this.$store.commit('setSocietyId', this.society)
      this.$store.commit('setSocietyName', this.$q.localStorage.getItem('JOURNEY_Societyname'))
      this.getfeedcontent()
    },
    chooseTranslation () {
      this.$q.localStorage.set('JOURNEY_Bible', this.bible)
    }
  },
  async mounted () {
    if (!this.$q.platform.is.ios) {
      this.webpush = Notification.permission
    } else {
      this.webpush = 'Unavailable on your platform'
    }
    if (this.$route.params.society) {
      this.$axios.get(process.env.API + '/journeysettings/' + this.$route.params.society)
        .then(response => {
          this.$q.localStorage.set('JOURNEY_District', response.data.circuit.district.id)
          this.populateDistricts()
          this.district = parseInt(this.$q.localStorage.getItem('JOURNEY_District'))
          this.chooseDistrict()
          this.$q.localStorage.set('JOURNEY_Circuit', response.data.circuit.id)
          this.$q.localStorage.set('JOURNEY_Circuitname', response.data.circuit.circuit)
          this.$store.commit('setCircuitName', response.data.circuit.circuit)
          this.$store.commit('setCircuitId', response.data.circuit.id)
          this.circuit = parseInt(this.$q.localStorage.getItem('JOURNEY_Circuit'))
          this.chooseCircuit()
          this.$q.localStorage.set('JOURNEY_Society', response.data.id)
          this.$q.localStorage.set('JOURNEY_Societyname', response.data.society)
          this.$store.commit('setSocietyId', response.data.id)
          this.$store.commit('setSocietyName', response.data.society)
          this.society = parseInt(this.$q.localStorage.getItem('JOURNEY_Society'))
          this.chooseSociety()
          if (!this.$q.localStorage.getItem('JOURNEY_Bible')) {
            this.$q.localStorage.set('JOURNEY_Bible', this.bible)
          }
          this.getfeedcontent()
        })
        .catch(error => {
          if (error.code === 'ECONNABORTED') {
            this.$q.notify('Server connection timed out - are you offline?')
          } else {
            console.log(error)
          }
        })
    } else {
      if (this.$q.localStorage.getItem('JOURNEY_District')) {
        this.populateDistricts()
        this.district = parseInt(this.$q.localStorage.getItem('JOURNEY_District'))
        await this.chooseDistrict()
      }
      if (this.$q.localStorage.getItem('JOURNEY_Circuit')) {
        this.circuit = parseInt(this.$q.localStorage.getItem('JOURNEY_Circuit'))
        await this.chooseCircuit()
      }
      if (this.$q.localStorage.getItem('JOURNEY_Society')) {
        this.society = parseInt(this.$q.localStorage.getItem('JOURNEY_Society'))
        await this.chooseSociety()
      }
      if (!this.$q.localStorage.getItem('JOURNEY_Bible')) {
        this.$q.localStorage.set('JOURNEY_Bible', this.bible)
      }
      if (this.$q.localStorage.getItem('JOURNEY_VerifiedPhone')) {
        this.phone = this.$q.localStorage.getItem('JOURNEY_VerifiedPhone')
      }
      if (!this.$q.localStorage.getItem('JOURNEY_District')) {
        this.populateDistricts()
      }
    }
  }
}
</script>

<style>
.q-ma-md {
  padding-top:0;
}
p {
  margin-bottom: 0;
}
h3 {
  line-height:0px;
}
</style>
