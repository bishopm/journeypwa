<template>
  <div class="q-mt-xs q-ma-md" v-if="blogposts && blogposts.length">
    <div v-for="blog in blogposts" :key="blog.title">
      <p class="bg-secondary text-white caption text-center q-pa-sm"><b>{{blog.title}}</b><br><small>{{blog.author}} [{{blog.pubdate}}]</small></p>
      <div v-html="blog.body"></div>
    </div>
    <div class="text-center text-bold text-primary">{{description}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      blogposts: []
    }
  },
  mounted () {
    if (!this.$store.state.feeditems) {
      this.$router.push({ name: 'home' })
    }
    this.blogposts = this.$store.state.feeditems['blog'][this.$route.params.id].items
    this.description = this.$store.state.feeditems['blog'][this.$route.params.id].items[0].description
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
