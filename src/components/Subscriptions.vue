<template>
  <div class="q-mt-xs q-ma-md">
    <q-list>
      <q-item v-for="(sub, index) in subscriptions" :key="index">
        <q-item-section>{{sub.title}}</q-item-section>
        <q-item-section avatar>{{sub.subs}}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      subscriptions: []
    }
  },
  mounted () {
    if (!this.$store.state.feeditems) {
      this.$router.push({ name: 'home' })
    }
    for (var sndx in this.$store.state.feeditems.feeds) {
      var thissub = this.$store.state.feeditems.feeds[sndx]
      if (thissub.subs === '') {
        thissub.subval = 0
      } else if (thissub.subs === 'Bishopm\Churchnet\Models\User') {
        thissub.subval = 1
      } else {
        thissub.subval = 2
      }
    }
    this.subscriptions.push(thissub)
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
