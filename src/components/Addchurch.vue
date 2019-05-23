<template>
  <div class="q-ma-sm">
    <div class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">Add my church</div>
    <q-stepper v-model="step" vertical ref="stepper" color="primary" animated style="width:100%;">
      <q-step :name="1" :title="'Synod: ' + district.label" icon="fa fa-church" :done="step > 1" :header-nav="step > 1">
        Select your synod and then click "Continue"
        <q-select borderless class="q-my-md" label="Synod" v-model="district" :options="districtOptions">
        <template v-slot:prepend>
          <q-icon name="fas fa-fw fa-sitemap" />
        </template>
      </q-select>
        <q-stepper-navigation>
          <q-btn @click="clickOne" color="primary" label="Continue" />
        </q-stepper-navigation>
      </q-step>
      <q-step :name="2" :title="'Circuit: ' + circuit.label" icon="fa fa-church" :done="step > 2">
        Find your circuit and then click "Continue"
        <q-select borderless class="q-my-md" label="Circuit" v-model="circuit" :options="circuitOptions">
          <template v-slot:prepend>
            <q-icon name="fas fa-fw fa-users" />
          </template>
        </q-select>
        <q-stepper-navigation>
          <q-btn @click="clickTwo" color="primary" label="Continue" />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
      <q-step :name="3" :title="'Society: ' +society.label" icon="fa fa-church">
        If your society is listed here, choose it, otherwise choose to add a new society
        <q-select borderless class="q-my-md" label="Society" v-model="society" :options="societyOptions">
          <template v-slot:prepend>
            <q-icon name="fas fa-fw fa-map-marker-alt" />
          </template>
        </q-select>
        <q-stepper-navigation>
          <q-btn color="primary" @click="clickThree" label="Add a new society" />
          <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
      <q-step :name="4" title="Add a new society" icon="fa fa-church">
        <q-form>
          <q-input outlined v-model="newsociety.name" label="Society name" :rules="[val => !!val || 'Society name is required']"/>
          <leafletmap :latitude="newsociety.latitude" :longitude="newsociety.longitude" editable="yes" initialZoom="10" @newlat="newlat" @newlng="newlng"></leafletmap>
          <div class="text-center" v-if="initlat !== newsociety.latitude && initlng !== newsociety.longitude">
            <small class="text-grey q-mr-sm">Lat: {{newsociety.latitude}}°</small><small class="text-grey">Lng: {{newsociety.longitude}}°</small>
          </div>
          <q-stepper-navigation>
            <q-btn color="primary" @click="clickFour" label="Finish" />
            <q-btn flat @click="step = 3" color="primary" label="Back" class="q-ml-sm" />
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
      district: { label: '', value: '' },
      circuit: { label: '', value: '' },
      society: { label: '', value: '' },
      newsociety: {
        name: '',
        latitude: null,
        longitude: null
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
      if (this.newsociety.name && this.newsociety.longitude !== this.initlng && this.newsociety.latitude !== this.initlat) {
        console.log('All done')
      } else {
        this.$q.notify('Please supply the name and GPS co-ordinates of the new society.')
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
        .catch(function (error) {
          console.log(error)
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
        .catch(function (error) {
          console.log(error)
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
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.populateDistricts()
  }
}
</script>

<style>
p {
  margin-bottom: 0px;
}
.caption {
  line-height: 0px;
}
</style>
