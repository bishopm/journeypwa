<template>
  <div class="q-mt-xs layout-padding" v-if="contents.length">
    <div class="caption text-center">For the week beginning: {{ monday() }}</div>
    <div v-for="item in contents" :key="item.feedpost.title">
      <div class="text-center caption">{{item.feedpost.title}}<br><small><i>{{item.source}}</i></small></div>
      <div v-html="item.feedpost.body"></div>
      <hr class="q-mt-lg">
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'
export default {
  data () {
    return {
      contents: []
    }
  },
  methods: {
    monday () {
      var mon = new Date()
      mon.setDate(mon.getDate() + (1 - mon.getDay()) % 7)
      return date.formatDate(mon, 'YYYY-MM-DD')
    }
  },
  mounted () {
    this.contents = this.$store.state.feeditems[this.$route.params.ctype]
  }
}
</script>

<style>
h5 {
  line-height: 0px;
  font-style: italic;
  font-size: 70%;
}
</style>
