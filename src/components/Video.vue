<template>
  <div>
    <div v-if="video.title">
      <p class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">{{video.title}}</p>
      <q-video :ratio="16/9" :src="video.body" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      video: {}
    }
  },
  mounted () {
    this.video.title = ''
    if (!this.$store.state.societyid) {
      this.$router.push({ name: 'home' })
    }
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    this.$axios.get(process.env.API + '/feedpost/' + this.$route.params.id)
      .then(response => {
        this.video = response.data
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
</style>
