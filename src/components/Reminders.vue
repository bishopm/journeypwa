<template>
  <div class="q-mt-xs layout-padding">
    <q-list v-if="notifications" no-border class="text-center caption">Messages
      <q-item v-for="notification in notifications" :key="notification.id">{{notification.message}}</q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      notifications: []
    }
  },
  mounted () {
    console.log(this.$store.state.individual)
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    this.$axios.post(process.env.API + '/reminders',
      {
        individual: this.$store.state.individual.id
      })
      .then(response => {
        this.notifications = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style>
.q-list-striped > .q-item:nth-child(even) {
  background-color: #E6f2d9;
}
</style>
