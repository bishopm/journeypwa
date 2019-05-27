<template>
  <div>
    <q-list v-if="readings" class="no-border">
      <p class="caption text-center q-my-md" v-if="date"><b>{{date}}</b><br><small>({{description}})</small></p>
      <q-item v-for="(reading, index) in readings" :key="reading.key" :to="'/reading/' + encodeURI(reading)" :class="{striped: index % 2 === 1}">
        <q-item-section class="text-center">
          <q-item-label v-html="cleanup(reading)"/>
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="isextras">
      <h4 class="text-center">Special services this week</h4>
      <div v-for="(extra, key) in extras" :key="key">
        <q-list v-if="readings" striped class="no-border">
          <p class="caption text-center"><b>{{key}}</b><br><small>({{extra.description}})</small></p>
          <q-item v-for="reading in extra.readings.split(';')" :key="reading" :to="'/reading/' + encodeURI(reading)">
            <q-item-label class="text-center" v-html="cleanup(reading)"/>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      readings: [],
      description: '',
      date: '',
      extras: null
    }
  },
  methods: {
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
    // this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.profile.token
    this.$axios.get(process.env.API + '/sunday/' + this.$route.params.date)
      .then(response => {
        this.date = response.data.date
        this.description = response.data.description
        this.readings = response.data.readings
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
.q-item.striped {
  background-color:#E6f2d9;
  margin-left:20px;
  margin-right:20px;
}
</style>
