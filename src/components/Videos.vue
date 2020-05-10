<template>
  <div>
    <p class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">Video library</p>
    <q-list v-if="videos" class="no-border">
      <q-item v-for="video in videos" :key="video.id" :to="'/videos/' + video.id">
        <q-item-section class="text-center">
          <div class="caption">{{video.title}}</div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      videos: []
    }
  },
  mounted () {
    if (!this.$store.state.societyid) {
      this.$router.push({ name: 'home' })
    }
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    this.$axios.get(process.env.API + '/videos/' + this.$store.state.societyid)
      .then(response => {
        this.videos = response.data
      })
      .catch(error => {
        if (error.code === 'ECONNABORTED') {
          this.$q.notify('Server connection timed out - are you offline?')
        } else {
          console.log(error)
        }
      })
  }
}
</script>

<style>
p {
  margin-bottom: 0px;
}
</style>
