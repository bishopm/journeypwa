<template>
  <div class="q-ma-md" v-if="blogs.length">
    <p class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">Blogs</p>
    <q-list>
      <q-item v-for="(blog, index) in blogs" :key="blog.permalink" :to="'/blogposts/' + index">
        <q-item-section class="text-center">
          {{blog.title}}
        </q-item-section>
        <q-item-section avatar>
          <q-chip>{{blog.items.length}}</q-chip>
        </q-item-section>
      </q-item>
    </q-list>
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
    if (!this.$store.state.feeditems) {
      this.$router.push({ name: 'home' })
    }
    this.blogs = this.$store.state.feeditems.blog
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
