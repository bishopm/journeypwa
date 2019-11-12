<template>
  <div class="q-ma-md">
    <q-tabs v-model="selectedTab" active-color="white" indicator-color="primary" class="no-border bg-secondary text-primary" q-tabs-two-lines>
      <q-tab v-for="feedtype in feedtypes" :name="feedtype" :key="feedtype">{{feedtype}}</q-tab>
    </q-tabs>
    <q-tab-panels v-model="selectedTab" animated class="q-ma-sm">
      <q-tab-panel v-for="feedtype in feedtypes" :name="feedtype" :key="feedtype" class="no-border">
        <q-list>
          <q-item v-for="(sub, index) in subscriptions" :key="index">
            <q-checkbox v-if="sub.category === feedtype" @input="changeSub(sub.id, !sub.subval, index)" :class="sub.disabled ? 'text-grey' : 'text-black'" :color='sub.color' :disable="sub.disabled" v-model="allvals[index]" :label="sub.title">
              <div><small>{{sub.description}}</small></div>
            </q-checkbox>
          </q-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
    <p v-if="subscriptions.length" class="q-mt-md q-pa-md text-grey text-center">Changes made here take effect after restarting the app</p>
    <p v-else class="q-mt-md q-pa-md text-grey text-center">No subscriptions have been set up by your administrator yet</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      allvals: [],
      subscriptions: [],
      feedtypes: [],
      selectedTab: '',
      dumfeed: {}
    }
  },
  methods: {
    changeSub (id, event, ndx) {
      if (this.subscriptions[ndx].subval === true) {
        this.subscriptions[ndx].subval = false
      } else {
        this.subscriptions[ndx].subval = true
      }
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
      this.$axios.post(process.env.API + '/mysubscriptions',
        {
          user_id: this.$q.localStorage.getItem('JOURNEY_User'),
          feed_id: id,
          state: event
        })
        .then(response => {
          if (response.data === 'Subscription deleted') {
            this.$q.notify('You have unsubscribed from this feed. When you restart the app, content from this feed will no longer appear.')
          } else {
            console.log(response.data)
            this.$q.notify('You have subscribed to a new feed. When you restart the app, available content from this feed will appear.')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    if (!this.$store.state.feeditems) {
      this.$router.push({ name: 'home' })
    }
    for (var sndx in this.$store.state.feeditems.feeds) {
      if (this.feedtypes.indexOf(this.$store.state.feeditems.feeds[sndx].category) < 0) {
        this.feedtypes.push(this.$store.state.feeditems.feeds[sndx].category)
      }
      this.dumfeed = {}
      if (!this.$store.state.feeditems.feeds[sndx].subs) {
        this.dumfeed.subval = false
        this.dumfeed.disabled = false
        this.dumfeed.color = 'green'
      } else if (this.$store.state.feeditems.feeds[sndx].subs === 'Bishopm\\Churchnet\\Models\\User') {
        this.dumfeed.subval = true
        this.dumfeed.disabled = false
        this.dumfeed.color = 'green'
      } else {
        this.dumfeed.subval = true
        this.dumfeed.disabled = true
        this.dumfeed.color = 'grey'
      }
      this.dumfeed.id = this.$store.state.feeditems.feeds[sndx].id
      this.allvals.push(this.dumfeed.subval)
      this.dumfeed.title = this.$store.state.feeditems.feeds[sndx].title
      this.dumfeed.category = this.$store.state.feeditems.feeds[sndx].category
      this.subscriptions.push(this.dumfeed)
    }
    this.selectedTab = this.feedtypes[0]
  }
}
</script>

<style>
h2 {
  line-height: 0px;
  font-style: italic;
  font-size: 110%;
  text-align: center;
}
.q-item {
  padding: 0px;
  min-height: 0px;
}
.q-tab-panel {
  padding: 0px;
}
</style>
