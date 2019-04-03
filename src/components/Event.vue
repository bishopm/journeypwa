<template>
  <div v-if="event" class="text-center q-ma-md">
    <h3>{{event.group.groupname}}</h3>
    <p class="caption">{{event.group.description}}</p>
    <p class="text-left q-mt-md"><b>Date & time:</b> {{formatme(event.group.eventdatetime)}}</p>
    <div class="text-left q-mt-md">
      <b>Signed up so far: ({{event.members.length}})</b><br><br>
      <p v-for="member in event.members" :key="member.id">
        {{member.firstname}} {{member.surname}}
      </p>
    </div>
    <br>Household members available to be signed up:
    <p v-for="member in members" :key="member.id">{{member.firstname}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      event: {},
      members: [],
      eventmembers: []
    }
  },
  methods: {
    formatme (datein) {
      var fin = new Date(datein * 1000)
      return fin.toString().substring(4, 21)
    }
  },
  mounted () {
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    this.$axios.get(process.env.API + '/groups/' + this.$route.params.id)
      .then((response) => {
        this.event = response.data
        for (var gkey in this.event.members) {
          this.eventmembers.push(this.event.members[gkey].id)
        }
        for (var ikey in this.$store.state.individual.household.individuals) {
          if (this.eventmembers.indexOf(this.$store.state.individual.household.individuals[ikey].id) < 0) {
            this.members.push(this.$store.state.individual.household.individuals[ikey])
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style>
</style>
