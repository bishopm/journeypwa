<template>
  <div class="q-mt-xs q-ma-md">
    <q-list>
      <q-item v-for="(sub, index) in subscriptions" :key="index">
        <q-checkbox right-label :disable="sub.subval > 1" v-model="tick" :label="sub.title" />
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      subscriptions: [],
      tick: null
    }
  },
  mounted () {
    if (!this.$store.state.feeditems) {
      this.$router.push({ name: 'home' })
    }
    for (var sndx in this.$store.state.feeditems.feeds) {
      if (!this.$store.state.feeditems.feeds[sndx].subs) {
        this.$store.state.feeditems.feeds[sndx].subval = 0
      } else if (this.$store.state.feeditems.feeds[sndx].subs === 'Bishopm\Churchnet\Models\User') {
        this.$store.state.feeditems.feeds[sndx].subval = 1
      } else {
        this.$store.state.feeditems.feeds[sndx].subval = 2
      }
      this.subscriptions.push(this.$store.state.feeditems.feeds[sndx])
    }
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
</style>
