<template>
  <div class="q-mt-xs q-ma-md">
    <p class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">Songs and liturgy</p>
    <q-list class="no-border">
      <div v-if="songs" class="text-center">Songs <q-icon size="sm" name="fas fa-music"/>
        <q-item v-for="song in songs" :key="song.id" :to="'/hymns/' + song.id">
          <q-item-label>
            <div style="color:#4d7227" class="text-center">{{song.title}}</div>
          </q-item-label>
        </q-item>
      </div>
      <div v-if="liturgies" class="q-mt-md text-center">Liturgy <q-icon size="sm" name="fas fa-list"/>
        <q-item v-for="liturgy in liturgies" :key="liturgy.id" :to="'/hymns/' + liturgy.id">
          <q-item-label>
            <div style="color:#4d7227" class="text-center">{{liturgy.title}}</div>
          </q-item-label>
        </q-item>
      </div>
    </q-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      songs: [],
      liturgies: []
    }
  },
  mounted () {
    if (!this.$store.state.societyid) {
      this.$router.push({ name: 'home' })
    }
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    this.$axios.get(process.env.API + '/hymns/' + this.$store.state.societyid)
      .then(response => {
        this.songs = response.data.song
        this.liturgies = response.data.liturgy
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
.q-list-striped > .q-item:nth-child(even) {
  background-color: #E6f2d9;
}
</style>
