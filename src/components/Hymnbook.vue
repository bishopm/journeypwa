<template>
  <div class="q-mt-xs q-ma-md">
    <q-tabs v-model="selectedTab" active-color="white" indicator-color="primary" class="no-border bg-secondary text-primary">
      <q-tab name="songTab" key="songTab">Songs</q-tab>
      <q-tab name="liturgyTab" key="liturgyTab">Liturgy</q-tab>
    </q-tabs>
    <q-tab-panels v-model="selectedTab" animated class="q-ma-sm">
      <q-tab-panel key="songTab" name="songTab" class="no-border">
        <q-item v-for="song in songs" :key="song.id" :to="'/hymns/' + song.id">
          <q-item-label>
            <div class="text-center text-primary">{{song.title}}</div>
          </q-item-label>
        </q-item>
      </q-tab-panel>
      <q-tab-panel key="liturgyTab" name="liturgyTab" class="no-border">
        <q-item v-for="liturgy in liturgies" :key="liturgy.id" :to="'/hymns/' + liturgy.id">
          <q-item-label>
            <div class="text-primary text-center">{{liturgy.title}}</div>
          </q-item-label>
        </q-item>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  data () {
    return {
      songs: [],
      liturgies: [],
      selectedTab: 'songTab'
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
