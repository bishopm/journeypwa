<template>
  <div class="layout-padding">
    <h3 class="text-center">Seeking grace</h3>
    <p class="text-justify">St Ignatius encouraged followers of Jesus to daily bring their deep longings to God and ask for grace from God. From the list below what is the gift you may be seeking today?</p>
    <q-list no-border>
      <q-item>
        <q-item-side icon="people" color="primary" class="text-left text-primary">
          CONNECT
        </q-item-side>
        <q-item-main class="text-right">
          <small>the gift of life-giving relationships</small>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-side icon="hearing" color="primary" class="text-left text-primary">
          LISTEN
        </q-item-side>
        <q-item-main class="text-right">
          <small>the gift of hearing God speak</small>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-side icon="pause_circle_filled" color="primary" class="text-left text-primary">
          SABBATH
        </q-item-side>
        <q-item-main class="text-right">
          <small>the gift of rest</small>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-side icon="build" color="primary" class="text-left text-primary">
          SERVE
        </q-item-side>
        <q-item-main class="text-right">
          <small>the gift of serving others</small>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-side icon="fingerprint" color="primary" class="text-left text-primary">
          CREATE
        </q-item-side>
        <q-item-main class="text-right">
          <small>the gift of using my unique gifts for the glory of God</small>
        </q-item-main>
      </q-item>
    </q-list>
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
    this.$axios.get(this.$store.state.hostname + '/circuits/' + this.$store.state.circuitid + '/upcomingmeetings')
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
