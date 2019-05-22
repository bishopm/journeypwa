<template>
  <div class="q-mt-xs q-ma-md">
    <q-tabs v-model="selectedTab" active-color="white" indicator-color="primary" class="no-border bg-secondary text-primary" q-tabs-two-lines>
      <q-tab v-for="feedtype in feedtypes" :name="feedtype" :key="feedtype">{{feedtype}}</q-tab>
    </q-tabs>
    <q-tab-panels v-model="selectedTab" animated class="q-ma-sm">
      <q-tab-panel v-for="feedtype in feedtypes" :name="feedtype" :key="feedtype" class="no-border">
        <q-list>
          <q-item v-for="(sub, index) in filteredsubs" :key="index">
            <q-checkbox @input="changeSub(sub.id, sub.subval)" :class="sub.disabled ? 'text-grey' : 'text-black'" :color='sub.color' :disable="sub.disabled" v-model="sub.subval" :label="sub.title">
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
      subscriptions: [],
      feedtypes: [],
      selectedTab: ''
    }
  },
  computed: {
    filteredsubs () {
      let self = this
      return this.subscriptions.filter(function (sub) {
        return sub.category === self.selectedTab
      })
    }
  },
  methods: {
    changeSub (id, event) {
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
      this.$axios.post(process.env.API + '/mysubscriptions',
        {
          user_id: this.$q.localStorage.getItem('JOURNEY_User'),
          feed_id: id,
          state: event
        })
        .then(response => {
          this.lections = response.data
          // this.$q.loading.hide()
        })
        .catch(function (error) {
          console.log(error)
          // this.$q.loading.hide()
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
      if (!this.$store.state.feeditems.feeds[sndx].subs) {
        this.$store.state.feeditems.feeds[sndx].subval = false
        this.$store.state.feeditems.feeds[sndx].disabled = false
        this.$store.state.feeditems.feeds[sndx].color = 'green'
      } else if (this.$store.state.feeditems.feeds[sndx].subs === 'Bishopm\\Churchnet\\Models\\User') {
        this.$store.state.feeditems.feeds[sndx].subval = true
        this.$store.state.feeditems.feeds[sndx].disabled = false
        this.$store.state.feeditems.feeds[sndx].color = 'green'
      } else {
        this.$store.state.feeditems.feeds[sndx].subval = true
        this.$store.state.feeditems.feeds[sndx].disabled = true
        this.$store.state.feeditems.feeds[sndx].color = 'grey'
      }
      this.subscriptions.push(this.$store.state.feeditems.feeds[sndx])
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
