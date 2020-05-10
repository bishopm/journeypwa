<template>
  <div class="q-ma-md" v-if="sermons.length">
    <div v-for="sermon in sermons" :key="sermon.title" class="text-center">
      <p class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">{{sermon.title}} <small>[{{sermon.pubdate}}]</small></p>
      <div v-if="sermon" class="text-center">
        <img width="250" v-if="sermon.image" :src="confirmurl(sermon.image)"/><br>
        Preacher: {{sermon.author}}<br>
        <p v-html="sermon.body"></p>
        <p class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">Audio</p>
        <audio preload="none" controls><source :src="sermon.enclosure.link" :type="sermon.enclosure.type"></audio>
      </div>
      <div v-if="sermon.enclosure.player">
        <p class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">Video</p>
        <q-video :ratio="16/9" :src="sermon.enclosure.player" />
      </div>
      <hr class="q-mt-lg">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sermons: [],
      imageurl: '',
      sitelogo: {}
    }
  },
  methods: {
    confirmurl (urltxt) {
      if ((urltxt.indexOf('.jpg') !== -1) || (urltxt.indexOf('.jpeg') !== -1) || (urltxt.indexOf('.png') !== -1)) {
        return urltxt
      } else {
        return this.sitelogo.url
      }
    }
  },
  mounted () {
    if (!this.$store.state.feeditems) {
      this.$router.push({ name: 'home' })
    }
    this.sermons = this.$store.state.feeditems['sermon'][this.$route.params.id].items
    for (var sndx in this.sermons) {
      if (typeof this.sermons[sndx].enclosure === 'string') {
        this.sermons[sndx].enclosure = JSON.parse(this.sermons[sndx].enclosure)
      }
    }
    this.sitelogo = this.$store.state.feeditems['sermon'][this.$route.params.id].logo
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
