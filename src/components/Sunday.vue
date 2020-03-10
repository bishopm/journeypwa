<template>
  <div>
    <q-list v-if="customreadings" class="no-border">
      <p v-if="customreadings.length" class="bg-secondary text-white q-ma-md q-pa-sm header text-center">
        <b>Sunday's readings<span v-if="$store.state.societyname"> ({{$store.state.societyname}})</span>: {{date}}</b>
      </p>
      <q-item v-for="customreading in customreadings" :key="customreading.id" :to="'/reading/' + encodeURI(customreading)">
        <q-item-section class="text-center">
          <q-item-label v-html="cleanup(customreading)"/>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list v-if="readings" class="no-border">
      <p v-if="date" class="bg-secondary text-white q-ma-md q-pa-sm header text-center"><b>Lectionary readings: {{date}}</b><br>({{description}})</p>
      <q-item v-for="reading in readings" :key="reading.key" :to="'/reading/' + encodeURI(reading)">
        <q-item-section class="text-center">
          <q-item-label v-html="cleanup(reading)"/>
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="isextras">
      <h4 class="text-center">Special services this week</h4>
      <div v-for="(extra, key) in extras" :key="key">
        <q-list v-if="readings" class="no-border">
          <p class="caption text-center"><b>{{key}}</b><br><small>({{extra.description}})</small></p>
          <q-item v-for="reading in extra.readings.split(';')" :key="reading" :to="'/reading/' + encodeURI(reading)">
            <q-item-section class="text-center">
              <q-item-label v-html="cleanup(reading)"/>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <div class="q-my-lg text-center">
      <q-btn to="lectionary" color="primary">View full lectionary</q-btn>
    </div>
  </div>
</template>

<script>
import saveState from 'vue-save-state'
export default {
  data () {
    return {
      readings: [],
      customreadings: [],
      description: '',
      date: '',
      extras: null,
      society_id: ''
    }
  },
  mixins: [saveState],
  methods: {
    getSaveStateConfig () {
      return {
        'cacheKey': 'JOURNEY_Sunday'
      }
    },
    cleanup (textin) {
      return textin.replace(/\[/g, ' [').replace(/,/g, ', ').replace(' or ', '<br>or<br>')
    }
  },
  computed: {
    isextras () {
      if (this.extras) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    if (this.$store.state.societyid) {
      this.society_id = '/' + this.$store.state.societyid
    }
    this.$axios.get(process.env.API + '/sunday' + this.society_id)
      .then(response => {
        this.date = response.data.date
        this.description = response.data.description
        this.readings = response.data.readings
        this.customreadings = response.data.customreadings
        this.extras = response.data.extras
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
</script>

<style>
h4 {
  line-height: 0px;
}
p.caption {
  line-height: 12px;
}
</style>
