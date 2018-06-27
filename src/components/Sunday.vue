<template>
  <div>
    <p class="q-mt-md caption text-center">Welcome! Here are Sunday's readings</p>
    <q-list striped class="no-border">
      <p class="caption text-center q-my-md" v-if="date"><b>{{date}}</b><br><small>({{description}})</small></p>
      <q-item v-if="readings" v-for="reading in readings" :key="reading.key" :to="'/reading/' + encodeURI(reading)">
        <q-item-main class="text-center" v-html="cleanup(reading)"/>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import saveState from 'vue-save-state'
export default {
  data () {
    return {
      readings: [],
      description: '',
      date: ''
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
  mounted () {
    if (localStorage.getItem('JOURNEY_Society')) {
      this.$store.commit('setSociety', JSON.parse(localStorage.getItem('JOURNEY_Society')))
    }
    if (localStorage.getItem('JOURNEY_Circuit')) {
      this.$store.commit('setCircuitId', JSON.parse(localStorage.getItem('JOURNEY_Circuit')).id)
      this.$store.commit('setCircuitName', JSON.parse(localStorage.getItem('JOURNEY_Circuit')).name)
    }
    this.$axios.get(this.$store.state.hostname + '/methodist/circuits/' + this.$store.state.circuitid + '/societies/' + this.$store.state.society.id + '/feeditems')
      .then(response => {
        this.$store.commit('setFeeditems', response.data)
        if (response.data.groups) {
          this.$store.commit('setGroups', true)
        } else {
          this.$store.commit('setGroups', false)
        }
        if (response.data.birthdays) {
          this.$store.commit('setBirthdays', true)
        } else {
          this.$store.commit('setBirthdays', false)
        }
        if (response.data.media) {
          this.$store.commit('setMedia', true)
        } else {
          this.$store.commit('setMedia', false)
        }
      })
      .catch(function (error) {
        console.log(error)
        // this.$q.loading.hide()
      })
    this.$axios.get(this.$store.state.hostname + '/sunday')
      .then(response => {
        this.date = response.data.date
        this.description = response.data.description
        this.readings = response.data.readings
        // this.$q.loading.hide()
      })
      .catch(function (error) {
        console.log(error)
        // this.$q.loading.hide()
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
.q-list-striped > .q-item:nth-child(even) {
  background-color: #E0E1E2;
}
</style>
