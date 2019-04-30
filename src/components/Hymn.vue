<template>
  <div class="q-mt-xs q-ma-md">
    <p v-if="song" class="text-center caption">{{song.title}}</p>
    <div class="q-mx-md" v-if="song" v-html="song.body"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      song: {}
    }
  },
  mounted () {
    if (!this.$store.state.societyid) {
      this.$router.push({ name: 'home' })
    }
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    this.$axios.get(process.env.API + '/feedpost/' + this.$route.params.id)
      .then(response => {
        this.song = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style>
.q-list-striped > .q-item:nth-child(even) {
  background-color: #E6f2d9;
}
</style>
