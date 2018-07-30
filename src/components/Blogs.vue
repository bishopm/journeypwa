<template>
  <div class="q-mt-xs layout-padding" v-if="blogs.length">
    <div v-for="blog in blogs" :key="blog.title">
      <p class="caption text-center">{{blog.title}}<br><small>{{blog.author.name}} [{{blog.pubdate}}]</small></p>
      <div v-html="blog.content"></div>
      <hr class="q-mt-lg">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      blogs: []
    }
  },
  mounted () {
    this.blogs = this.$store.state.feeditems['blog']
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
