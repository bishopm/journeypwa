<template>
  <div class="layout-padding">
    <h3 class="text-center">Circuit diary</h3>
    <q-list no-border>
      <q-item v-if="anyevents" v-for="event in events" :key="event.id">
        <q-item-side class="text-left">
          <small>{{event.start}}<br><router-link :to="{ name: 'society', params: { id: event.society_id }}">{{event.society}}</router-link></small>
        </q-item-side>
        <q-item-main class="text-right">
          <b>{{event.details}}</b>
        </q-item-main>
      </q-item>
    </q-list>
    <p class="text-center" v-if="!anyevents">No upcoming circuit events have been added</p>
  </div>
</template>

<script>
import saveState from 'vue-save-state'
export default {
  data () {
    return {
      events: null
    }
  },
  mixins: [saveState],
  methods: {
    getSaveStateConfig () {
      return {
        'cacheKey': 'JOURNEY_Events'
      }
    }
  },
  computed: {
    anyevents () {
      return this.events.length
    }
  },
  mounted () {
    if (!localStorage.getItem('Journey_Events')) {
      this.$q.loading.show()
    }
    this.$axios.get(this.$store.state.hostname + '/methodist/circuits/' + this.$store.state.circuitid + '/upcomingmeetings')
      .then(response => {
        this.events = response.data
        this.$q.loading.hide()
      })
      .catch(function (error) {
        console.log(error)
        this.$q.loading.hide()
      })
  }

}
</script>

<style>
.layout-padding {
  padding-top:0;
}
h3 {
  line-height:0px;
}
</style>
