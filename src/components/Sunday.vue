<template>
  <div>
    <p class="q-mt-md caption text-center">Sunday's lectionary readings</p>
    <q-list v-if="readings" striped class="no-border">
      <p class="caption text-center q-my-md" v-if="date"><b>{{date}}</b><br><small>({{description}})</small></p>
      <q-item v-for="reading in readings" :key="reading.key" :to="'/reading/' + encodeURI(reading)">
        <q-item-main class="text-center" v-html="cleanup(reading)"/>
      </q-item>
    </q-list>
    <div v-if="isextras">
      <h4 class="text-center">Special services this week</h4>
      <div v-for="(extra, key) in extras" :key="key">
        <q-list v-if="readings" striped class="no-border">
          <p class="caption text-center"><b>{{key}}</b><br><small>({{extra.description}})</small></p>
          <q-item v-for="reading in extra.readings.split(';')" :key="reading" :to="'/reading/' + encodeURI(reading)">
            <q-item-main class="text-center" v-html="cleanup(reading)"/>
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
      description: '',
      date: '',
      extras: null
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
    this.$axios.get(process.env.API + '/sunday')
      .then(response => {
        this.date = response.data.date
        this.description = response.data.description
        this.readings = response.data.readings
        this.extras = response.data.extras
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
  background-color: #E6f2d9;
}
</style>
