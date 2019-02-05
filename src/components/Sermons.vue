<template>
  <div class="q-mt-xs layout-padding" v-if="sermons.length">
    <div v-for="sermon in sermons" :key="sermon.sermon.title" class="text-center">
      <p class="caption text-center">{{sermon.sermon.title}} <small>[{{sermon.sermon.servicedate}}]</small></p>
      <div v-if="sermon" class="text-center">
        <img :src="sermon.image"/><br>
        <audio preload="none" controls><source :src="sermon.sermon.mp3" type="audio/mpeg"></audio>
        <br>
        <span v-for="(reading, ndx) in sermon.readings" :key="reading">
          <router-link :to="'/reading/' + encodeURI(reading)">{{reading}}</router-link><span v-if="ndx < sermon.readings.length - 1">, </span>
        </span>
        <p>Preacher: {{sermon.sermon.preacher}}</p>
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
    for (var sermon in this.$store.state.feeditems['sermon']) {
      var serm = JSON.parse(this.$store.state.feeditems['sermon'][sermon].content)
      var readings = serm.readings.split(';')
      this.sermons.push({sermon: serm, readings: readings, image: this.$store.state.feeditems['sermon'][sermon].image})
    }
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
