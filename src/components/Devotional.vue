<template>
  <div class="q-mt-xs q-ma-md" v-if="blogposts && blogposts.length">
    <div v-for="blog in blogposts" :key="blog.title">
      <p class="bg-secondary text-white caption text-center q-pa-sm"><b>{{blog.title}}</b><br><small>{{blog.author}} [{{blog.pubdate}}]</small></p>
      <div v-html="blog.body"></div>
    </div>
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
    this.blogposts = this.$store.state.feeditems['devotion'][this.$route.params.id].items
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
img {
  display: none;
}
</style>
