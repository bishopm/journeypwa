<template>
  <div class="q-ma-md">
    <p class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">Upcoming events</p>
    <div class="text-center">
      <q-btn color="primary" :to="{ name: 'diaries', params: { scope: 'Society' }}" class="q-mr-sm">Society</q-btn>
      <q-btn color="secondary" :to="{ name: 'diaries', params: { scope: 'Circuit' }}" class="q-mr-sm">Circuit</q-btn>
      <q-btn color="black" :to="{ name: 'diaries', params: { scope: 'District' }}">District</q-btn>
    </div>
    <q-list class="q-mt-md" v-if="anyevents" no-border>
      <q-item v-for="event in events" :key="event.id">
        <q-item-section>
          <q-item-label>
            {{formatme(event.meetingdatetime)}}
          </q-item-label>
          <q-item-label caption>
            <router-link class="text-primary" :to="{ name: 'society', params: { id: event.society_id }}">{{event.society.society}}</router-link>
          </q-item-label>
        </q-item-section>
        <q-item-section :class="'text-right ' + styleme(event.meetable_type)">
          <q-item-label>
            <b>{{event.description}}</b>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <p class="text-center" v-if="!anyevents">No diary entries for the next 10 days</p>
  </div>
</template>

<script>
import saveState from 'vue-save-state'
export default {
  data () {
    return {
      events: this.$store.state.feeditems.diary
    }
  },
  mixins: [saveState],
  methods: {
    getSaveStateConfig () {
      return {
        'cacheKey': 'JOURNEY_Events'
      }
    },
    formatme (datein) {
      var fin = new Date(datein * 1000)
      return fin.toString().substring(4, 21)
    },
    styleme (mt) {
      if (mt === 'Bishopm\\Churchnet\\Models\\Society') {
        return 'bg-primary bgp'
      } else if (mt === 'Bishopm\\Churchnet\\Models\\Circuit') {
        return 'bg-secondary bgp'
      } else if (mt === 'Bishopm\\Churchnet\\Models\\District') {
        return 'bg-black bgp'
      }
    }
  },
  computed: {
    anyevents () {
      return this.events.length
    }
  }

}
</script>

<style>
.q-ma-md {
  padding-top:0;
}
h3 {
  line-height:0px;
}
.bgp {
  padding-top:7px;
  padding-right:7px;
  padding-bottom:7px;
  color:white;
}
</style>
