<template>
  <div class="text-center layout-padding">
    <div v-if="devotion" class="q-mt-md">
      DEVOTION: <span class="caption" v-html="devotion.title"></span>
      <div class="text-justify" v-html="devotion.content"></div>
    </div>
    <div class="text-justify"><small>Faith for daily living was first published in January 1961, an initiative of Rev Arnold Walker. Visit <a href="http://www.faithfordailyliving.org">www.faithfordailyliving.org</a> for more devotionals. Used by permission.</small></div>
  </div>
</template>

<script>
import saveState from 'vue-save-state'
export default {
  data () {
    return {
      devotion: {}
    }
  },
  mixins: [saveState],
  methods: {
    getSaveStateConfig () {
      return {
        'cacheKey': 'JOURNEY_FFDL'
      }
    }
  },
  mounted () {
    this.$q.loading.show()
    this.$axios.get(this.$store.state.hostname + '/feeds/ffdl')
      .then(response => {
        this.devotion = response.data.devotion
        this.$q.loading.hide()
      })
      .catch(function (error) {
        console.log(error)
        this.$q.loading.hide()
      })
  }
}
</script>

<style>
blockquote {
  margin-bottom: 10px;
  padding-bottom: 0px;
}
p {
  margin-bottom: 10px;
}

img.alignright {
  padding-left: 10px;
}
</style>
