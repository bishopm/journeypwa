<template>
  <div class="q-ma-md" v-if="contents.length">
    <div v-if="!$route.params.id" class="caption text-center">For the week beginning: {{ monday() }}</div>
    <div v-for="item in contents" :key="item.feedpost.title">
      <div class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">{{item.feedpost.title}}<br><small><i>{{item.source}}</i></small></div>
      <div v-html="item.feedpost.body"></div>
      <hr class="q-mt-lg">
    </div>
  </div>
</template>

<script>
import saveState from 'vue-save-state'
import { date } from 'quasar'
export default {
  data () {
    return {
      contents: []
    }
  },
  mixins: [saveState],
  methods: {
    getSaveStateConfig () {
      return {
        'cacheKey': 'JOURNEY_Resource_' + this.$route.params.id
      }
    },
    monday () {
      var mon = new Date()
      mon.setDate(mon.getDate() + (1 - mon.getDay()) % 7)
      return date.formatDate(mon, 'YYYY-MM-DD')
    }
  },
  mounted () {
    this.contents = []
    if (!this.$store.state.feeditems) {
      this.$router.push({ name: 'home' })
    }
    if (this.$route.params.id) {
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
      this.$axios.get(process.env.API + '/feeditem/' + this.$route.params.id)
        .then(response => {
          this.contents.push(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      this.contents = this.$store.state.feeditems[this.$route.params.ctype]
    }
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
