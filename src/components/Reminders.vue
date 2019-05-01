<template>
  <div class="q-mt-xs">
    <q-list striped v-if="notifications" no-border>
      <p class="bg-secondary text-white caption text-center q-pa-sm">Messages</p>
      <q-item v-for="notification in notifications" :key="notification.id" :class="{striped: index % 2 === 1}">
        <q-item-section class="text-justify"><span v-html="notification.message"/></q-item-section>
        <q-item-section avatar class="text-right">
          <q-icon @click.native="deleteme(notification.id)" class="cursor-pointer" color="red" name="fa fa-times" />
          <br><small>{{notification.ndate}}<br>{{notification.ntime}}</small>
        </q-item-section>
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
.q-item.striped {
  background-color:#E6f2d9;
  margin-left:20px;
  margin-right:20px;
}
</style>
