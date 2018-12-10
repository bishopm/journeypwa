<template>
  <div class="q-mt-xs layout-padding">
    <p class="text-center caption">Resource library<br>
      <small v-if="practices || media || groups">Click on an item to open</small>
      <small v-else>No items have been added to the library yet</small>
    </p>
    <div v-if="ready">
      <q-list striped-odd v-if="practices" class="no-border">
        <div class="text-center"><q-icon size="sm" name="fas fa-pray"/>
          <p>Practices</p>
        </div>
        <q-item v-for="practice in practices" :key="practice.id" :to="'/content/practice/' + practice.id">
          <q-item-main>
            <div style="color:#4d7227" class="text-center">{{practice.feedpost.title}}</div>
          </q-item-main>
        </q-item>
      </q-list>
      <q-list class="no-border" v-if="media">
        <div class="text-center"><q-icon size="sm" name="fas fa-images"/>
          <p>Media</p>
        </div>
        <q-item v-for="medi in media" :key="medi.id" :to="'/content/media/' + medi.id">
          <q-item-main>
            <div style="color:#4d7227" class="text-center">{{medi.feedpost.title}}</div>
          </q-item-main>
        </q-item>
      </q-list>
      <q-list class="no-border" v-if="groups">
        <div class="text-center"><q-icon size="sm" name="fas fa-users"/>
          <p>Groups</p>
        </div>
        <q-item v-for="group in groups" :key="group.id" :to="'/content/groups/' + group.id">
          <q-item-main>
            <div style="color:#4d7227" class="text-center">{{group.feedpost.title}}</div>
          </q-item-main>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      practices: [],
      groups: [],
      media: [],
      ready: false
    }
  },
  mounted () {
    if (!this.$store.state.societyid) {
      this.$router.push({ name: 'home' })
    }
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    this.$axios.get(process.env.API + '/feedlibrary/' + this.$store.state.societyid)
      .then(response => {
        this.practices = response.data.practice
        this.groups = response.data.groups
        this.media = response.data.media
        this.ready = true
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
