<template>
  <div class="q-mt-xs q-ma-md" v-if="sermons.length">
    <div v-for="sermon in sermons" :key="sermon.title" class="text-center">
      <p class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">{{sermon.title}} <small>[{{sermon.pubdate}}]</small></p>
      <div v-if="sermon" class="text-center">
        <img v-if="sermon.image" :src="sermon.image"/><br>
        <audio preload="none" controls><source :src="sermon.enclosure.link" type="audio/mpeg"></audio>
        <br>
        <p>Preacher: {{sermon.author}}</p>
        <p v-html="sermon.body"></p>
      </div>
      <hr class="q-mt-lg">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sermons: []
    }
  },
  mounted () {
    if (!this.$store.state.feeditems) {
      this.$router.push({ name: 'home' })
    }
    this.sermons = this.$store.state.feeditems['sermon'][this.$route.params.id].items
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
