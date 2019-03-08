<template>
  <div class="q-mt-xs">
    <q-list v-if="notifications" no-border>
      <q-list-header class="text-center">Messages</q-list-header>
      <q-item v-for="notification in notifications" :key="notification.id">
        <q-item-main class="text-justify">{{notification.message}}</q-item-main>
        <q-item-side @click.native="deleteme(notification.id)" class="cursor-pointer q-pl-sm text-center" color="red" icon="fa fa-times"><br><small>{{notification.created_at.slice(0,10)}}<br>{{notification.created_at.slice(11)}}</small></q-item-side>
      </q-item>
    </q-list>
    <div class="q-ma-md">{{message}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      notifications: [],
      message: ''
    }
  },
  mounted () {
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    this.$axios.post(process.env.API + '/reminders',
      {
        individual: this.$store.state.individual.id
      })
      .then(response => {
        this.notifications = response.data
        if (!this.notifications.length) {
          this.message = 'You have no messages'
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    deleteme (id) {
      for (var ndx in this.notifications) {
        if (this.notifications[ndx].id === id) {
          this.notifications.splice(ndx, 1)
        }
      }
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
      this.$axios.post(process.env.API + '/reminders/delete',
        {
          id: id
        })
        .then(response => {
          console.log('Item deleted')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.q-list-striped > .q-item:nth-child(even) {
  background-color: #E6f2d9;
}
</style>
