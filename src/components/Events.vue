<template>
  <div>
    <q-list v-if="events.length" class="no-border">
      <q-list-header class="text-center">Sign up for events <small>Click for details</small></q-list-header>
      <q-item v-for="event in events" :key="event.id" :to="'/events/' + event.id">
        <q-item-main>
          <b>{{event.groupname}}</b><br>
          {{formatme(event.eventdatetime)}}
        </q-item-main>
        <q-item-side>
          <small>{{event.description}}</small>
        </q-item-side>
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
