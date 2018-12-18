<template>
  <div class="layout-padding">
    <h3 class="text-center">{{entity}} Diary</h3>
    <q-list no-border>
      <q-item v-if="events" v-for="event in events" :key="event.id">
        <q-item-side class="text-left">
          <small>{{event.start}}<br><router-link :to="{ name: 'society', params: { id: event.society_id }}">{{event.society}}</router-link></small>
        </q-item-side>
        <q-item-main class="text-right">
          <b>{{event.details}}</b>
        </q-item-main>
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
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    formatme (datein) {
      var fin = new Date(datein * 1000).toISOString()
      return fin.substring(0, 10) + ' [' + fin.substring(11, 16) + ']'
    }
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
.bgp {
  padding-top:7px;
  padding-right:7px;
  padding-bottom:7px;
  color:white;
}
</style>
