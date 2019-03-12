<template>
  <div class="q-mt-xs">
    <q-list striped v-if="notifications" no-border>
      <q-list-header class="text-center">Messages</q-list-header>
      <q-item v-for="notification in notifications" :key="notification.id">
        <q-item-main class="text-justify"><small v-html="notification.message"></small></q-item-main>
        <q-item-side @click.native="deleteme(notification.id)" class="cursor-pointer q-pl-sm text-center" color="red" icon="fa fa-times"><br><small>{{notification.ndate}}<br>{{notification.ntime}}</small></q-item-side>
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
      message: '',
      feeditems: []
    }
  },
  mounted () {
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    this.$axios.post(process.env.API + '/reminders',
      {
        individual: this.$store.state.individual.id
      })
      .then(response => {
        for (var nndx in response.data) {
          var newitem = {
            id: response.data[nndx].id,
            message: response.data[nndx].message.replace(/(?:\r\n|\r|\n)/g, '<br>'),
            ndate: response.data[nndx].created_at.slice(0, 10),
            ntime: response.data[nndx].created_at.slice(11)
          }
          this.notifications.push(newitem)
        }
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
      this.feeditems = this.$store.state.feeditems
      for (var ndx in this.notifications) {
        if (this.notifications[ndx].id === id) {
          this.notifications.splice(ndx, 1)
        }
        this.feeditems.reminders = this.notifications
        this.$store.commit('setFeeditems', this.feeditems)
        if (!this.notifications.length) {
          this.message = 'You have no messages'
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
