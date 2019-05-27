<template>
  <div class="q-ma-sm">
    <div class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">Add my church</div>
    <q-stepper v-model="step" vertical ref="stepper" color="primary" animated style="width:100%;">
      <q-step :name="1" :title="'Synod: ' + district.label" icon="fa fa-church" :done="step > 1" :header-nav="step > 1">
        <q-select borderless @input="clickOne" class="q-my-md" label="Synod" v-model="district" :options="districtOptions">
          <template v-slot:prepend>
            <q-icon name="fas fa-fw fa-sitemap" />
          </template>
        </q-select>
        <q-btn v-if="district.label !== 'Choose your synod'" flat @click="clickOne" color="primary" icon-right="fa fa-arrow-right" label="Next" class="q-ml-sm" />
      </q-step>
      <q-step :name="2" :title="'Circuit: ' + circuit.label" icon="fa fa-church" :done="step > 2">
        <q-select borderless class="q-my-md" @input="clickTwo" label="Circuit" v-model="circuit" :options="circuitOptions">
          <template v-slot:prepend>
            <q-icon name="fas fa-fw fa-users" />
          </template>
        </q-select>
        <q-btn flat @click="step = 1" color="primary" icon="fa fa-arrow-left" label="Back" class="q-ml-sm" />
        <q-btn v-if="circuit.label !== 'Choose your circuit'" flat @click="clickTwo" color="primary" icon-right="fa fa-arrow-right" label="Next" class="q-ml-sm" />
      </q-step>
      <q-step :name="3" :title="'Society: ' +society.label" icon="fa fa-church">
        <q-select borderless class="q-my-md" @input="chooseSociety" label="Society" v-model="society" :options="societyOptions">
          <template v-slot:prepend>
            <q-icon name="fas fa-fw fa-map-marker-alt" />
          </template>
        </q-select>
        <q-stepper-navigation>
          <q-btn flat @click="step = 2" color="primary" icon="fa fa-arrow-left" label="Back" class="q-mr-sm" />
          <q-btn color="primary" @click="clickThree" label="Add a new society" />
        </q-stepper-navigation>
      </q-step>
      <q-step :name="4" title="Add a new society" icon="fa fa-church">
        <q-form>
          <q-input outlined hide-bottom-space v-model="newsociety.name" label="Society name" :rules="[val => !!val || 'Society name is required']"/>
          <q-input class="q-my-xs" outlined hide-bottom-space error-message="Enter a valid time" label="Service time" v-model="newsociety.servicetime" mask="time" :rules="['time']">
            <template v-slot:append>
              <q-icon name="fa fa-clock" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time format24h v-model="newsociety.servicetime"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select class="q-mb-sm" label="Service language" outlined v-model="newsociety.servicelanguage" :options="['isiZulu', 'English']"/>
          <leafletmap :latitude="newsociety.latitude" :longitude="newsociety.longitude" editable="yes" initialZoom="10" @newlat="newlat" @newlng="newlng"></leafletmap>
          <div class="text-center" v-if="initlat !== newsociety.latitude && initlng !== newsociety.longitude">
            <small class="text-grey q-mr-sm">Lat: {{newsociety.latitude}}°</small><small class="text-grey">Lng: {{newsociety.longitude}}°</small>
          </div>
          <q-stepper-navigation>
            <q-btn color="primary" @click="clickFour" label="Finish" />
            <q-btn flat @click="step = 3" color="primary" icon="fa fa-arrow-left" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-form>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import leafletmap from './Leafletmap'
export default {
  data () {
    return {
      step: 1,
      map: null,
      marker: null,
      church: 'mcsa',
      initlng: null,
      initlat: null,
      longitude: 0,
      latitude: 0,
      district: { label: 'Choose your synod', value: '' },
      circuit: { label: 'Choose your circuit', value: '' },
      society: { label: 'Choose your society or add a new one', value: '' },
      newsociety: {
        name: '',
        latitude: null,
        longitude: null,
        servicetime: '',
        servicelanguage: 'isiZulu'
      },
      districtOptions: [],
      circuitOptions: [],
      societyOptions: []
    }
  },
  components: {
    'leafletmap': leafletmap
  },
  methods: {
    clickOne () {
      this.step = 2
      this.populateCircuits()
    },
    clickTwo () {
      this.step = 3
      this.populateSocieties()
    },
    clickThree () {
      this.step = 4
    },
    clickFour () {
      if (this.newsociety.name && this.newsociety.longitude !== this.initlng && this.newsociety.latitude !== this.initlat && this.newsociety.servicetime) {
        this.$axios.post(process.env.API + '/societies/useradded',
          {
            society: this.newsociety.name,
            latitude: this.newsociety.latitude,
            longitude: this.newsociety.longitude,
            servicetime: this.newsociety.servicetime,
            servicelanguage: this.newsociety.servicelanguage,
            circuit: this.circuit.value
          })
          .then(response => {
            this.$q.localStorage.set('JOURNEY_Societyname', this.newsociety.name)
            this.$q.localStorage.set('JOURNEY_Society', response.data.id)
            this.$q.notify('Thank you! Your society has been added and will be published once an administrator has checked it.')
            this.$router.push({ name: 'home' })
          })
          .catch(error => {
            if (error.code === 'ECONNABORTED') {
              this.$q.notify('Server connection timed out - are you offline?')
            } else {
              console.log(error)
            }
          })
      } else {
        this.$q.notify('Please supply the name and GPS co-ordinates of the new society and the time and language of one service.')
      }
    },
    newlat (coord) {
      this.newsociety.latitude = coord
    },
    newlng (coord) {
      this.newsociety.longitude = coord
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
    populateCircuits () {
      this.$axios.get(process.env.API + '/districts/' + this.district.value)
        .then(response => {
          this.circuitOptions = []
          for (var ckey in response.data) {
            var newitem = {
              label: response.data[ckey].circuitnumber + ' ' + response.data[ckey].circuit,
              value: response.data[ckey].id
            }
            this.circuitOptions.push(newitem)
          }
          this.$q.localStorage.set('JOURNEY_District', this.district.value)
        })
        .catch(error => {
          if (error.code === 'ECONNABORTED') {
            this.$q.notify('Server connection timed out - are you offline?')
          } else {
            console.log(error)
          }
        })
    },
    populateSocieties () {
      this.$axios.get(process.env.API + '/circuits/' + this.circuit.value + '/societies')
        .then(response => {
          this.societyOptions = []
          for (var skey in response.data) {
            var newitem = {
              label: response.data[skey].society,
              value: response.data[skey].id
            }
            this.societyOptions.push(newitem)
          }
          if (this.societyOptions.length && response.data[0].location) {
            this.newsociety.longitude = response.data[0].location.longitude
            this.initlng = this.newsociety.longitude
            this.newsociety.latitude = response.data[0].location.latitude
            this.initlat = this.newsociety.latitude
          }
          this.$q.localStorage.set('JOURNEY_Circuit', this.circuit.value)
          this.$q.localStorage.set('JOURNEY_Circuitname', this.circuit.label)
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
      this.$q.localStorage.set('JOURNEY_Societyname', this.society.label)
      this.$q.localStorage.set('JOURNEY_Society', this.society.value)
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
      this.$axios.post(process.env.API + '/phone',
        {
          phone: this.$q.localStorage.getItem('JOURNEY_VerifiedPhone'),
          society_id: this.$q.localStorage.getItem('JOURNEY_Society')
        })
        .then(response => {
          if (response.data.individual) {
            if (!this.$q.localStorage.getItem('JOURNEY_Individual')) {
              this.$q.localStorage.set('JOURNEY_Individual', JSON.stringify(response.data.individual))
            }
          }
          this.$router.push({ name: 'home' })
          window.location.reload()
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            localStorage.removeItem('JOURNEY_Token')
            window.location.reload()
          } else {
            console.log(error)
          }
        })
    }
  },
  mounted () {
    this.populateDistricts()
  }
}
</script>

<style>
.q-stepper--vertical .q-stepper__step-inner {
  padding-bottom: 0px;
}
p {
  margin-bottom: 0px;
}
.caption {
  line-height: 0px;
}
</style>
