<template>
  <div class="q-mt-xs layout-padding" v-if="contents.length">
    <div v-for="item in contents" :key="item.feedpost.title">
      <div class="text-center caption">{{item.feedpost.title}}<br><small><i>{{item.source}}</i></small></div>
      <div v-html="item.feedpost.body"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      contents: []
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
