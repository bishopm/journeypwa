<template>
  <div class="q-ma-md">
    <p class="bg-secondary q-py-md text-white text-bold text-center caption">{{entity}} Diary</p>
    <q-list v-if="events" no-border>
      <q-item v-for="event in events" :key="event.id">
        <q-item-section>
          <q-item-label>
            {{formatme(event.start)}}
          </q-item-label>
          <q-item-label caption>
            <router-link class="text-primary" :to="{ name: 'society', params: { id: event.society_id }}">{{event.society}}</router-link>
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <b>{{event.details}}</b>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <p class="text-center" v-if="!events">No upcoming events have been added</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      events: [],
      entity: ''
    }
  },
  mounted () {
    this.$axios.get(process.env.API + '/upcomingmeetings/' + this.$route.params.scope + '/' + this.$store.state.societyid)
      .then(response => {
        this.entity = response.data.entity
        this.events = response.data.events
      })
      .catch(error => {
        if (error.code === 'ECONNABORTED') {
          this.$q.notify('Server connection timed out - are you offline?')
        } else {
          console.log(error)
        }
      })
  },
  methods: {
    formatme (datein) {
      var fin = new Date(datein * 1000)
      return fin.toString().substring(4, 21)
    }
  }

}
</script>

<style>
.q-ma-md {
  padding-top:0;
}
h4 {
  line-height:0px;
}
.bgp {
  padding-top:7px;
  padding-right:7px;
  padding-bottom:7px;
  color:white;
}
</style>
