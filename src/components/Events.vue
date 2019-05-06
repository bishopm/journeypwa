<template>
  <div>
    <p class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">Upcoming events (Click event for details)</p>
    <q-list v-if="events.length" class="no-border">
      <q-item v-for="event in events" :key="event.id" :to="'/events/' + event.id">
        <q-item-section class="text-center">
          <div class="caption">{{event.groupname}}</div><div class="q-ml-md text-weight-thin">{{formatme(event.eventdatetime)}}</div>
        </q-item-section>
        <q-item-section avatar>
          {{event.group}}
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      events: []
    }
  },
  methods: {
    formatme (datein) {
      var fin = new Date(datein * 1000)
      return fin.toString().substring(4, 21)
    }
  },
  mounted () {
    if (!this.$store.state.feeditems) {
      this.$router.push({ name: 'home' })
    }
    for (var endx in this.$store.state.feeditems['events']) {
      this.events.push(this.$store.state.feeditems['events'][endx])
    }
  }
}
</script>

<style>
p {
  margin-bottom: 0px;
}
</style>
