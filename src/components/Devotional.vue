<template>
  <div class="q-ma-md" v-if="devotionalposts && devotionalposts.length">
    <div v-for="devotional in devotionalposts" :key="devotional.title">
      <p class="bg-secondary text-white caption text-center q-pa-sm"><b>{{devotional.title}}</b><br><small>{{devotional.author}} [{{devotional.pubdate}}]</small></p>
      <div v-html="devotional.body"></div>
    </div>
    <div class="text-center text-bold text-primary">{{description}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      devotionalposts: [],
      description: ''
    }
  },
  mounted () {
    if (!this.$store.state.feeditems) {
      this.$router.push({ name: 'home' })
    }
    this.devotionalposts = this.$store.state.feeditems['devotional'][this.$route.params.id].items
    this.description = this.$store.state.feeditems['devotional'][this.$route.params.id].items[0].description
  }
}
</script>

<style>
h1, h2, h3 {
  margin-block-start: 16px;
  margin-block-end: 16px;
  line-height: 0px;
  font-style: italic;
  font-size: 120%;
  text-align: center;
}
img {
  display: none;
}
</style>
