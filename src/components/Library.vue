<template>
  <div class="q-ma-md">
    <p class="text-center caption">Resource library<br>
      <small v-if="practices.length || media.length || groups.length">Click on an item to open</small>
      <small v-else>No items have been added to the library yet</small>
    </p>
    <p class="text-justify" v-if="message">{{message}}</p>
    <div v-if="ready">
      <q-list class="no-border">
        <div class="text-center"><q-icon size="sm" name="fas fa-archive"/>
          <p>Archives</p>
        </div>
        <q-item key="groups" to="/archive/groups">
          <q-item-label>
            <div class="text-primary text-center">Archived small group material</div>
          </q-item-label>
        </q-item>
        <q-item key="children" to="/archive/children">
          <q-item-label>
            <div class="text-primary text-center">Archived questions for children</div>
          </q-item-label>
        </q-item>
      </q-list>
      <q-list class="no-border" v-if="groups">
        <div class="text-center"><q-icon size="sm" name="fas fa-users"/>
          <p>Groups</p>
        </div>
        <q-item v-for="group in groups" :key="group.id" :to="'/content/groups/' + group.id">
          <q-item-label>
            <div class="text-primary text-center">{{group.feedpost.title}}</div>
          </q-item-label>
        </q-item>
      </q-list>
      <q-list class="no-border" v-if="songs">
        <div class="text-center"><q-icon size="sm" name="fas fa-music"/>
          <p>Hymnbook</p>
        </div>
        <q-item key="songliturgy" to="hymnbook">
          <q-item-label>
            <div class="text-primary text-center">Hymns, songs & liturgy
              <q-chip color="tertiary" class="q-ml-md">{{songs}}</q-chip>
            </div>
          </q-item-label>
        </q-item>
      </q-list>
      <q-list class="no-border" v-if="media">
        <div class="text-center"><q-icon size="sm" name="fas fa-images"/>
          <p>Media</p>
        </div>
        <q-item v-for="medi in media" :key="medi.id" :to="'/content/media/' + medi.id">
          <q-item-label>
            <div class="text-primary text-center">{{medi.feedpost.title}}</div>
          </q-item-label>
        </q-item>
      </q-list>
      <q-list v-if="practices" class="no-border">
        <div class="text-center"><q-icon size="sm" name="fas fa-pray"/>
          <p>Practices</p>
        </div>
        <q-item v-for="practice in practices" :key="practice.id" :to="'/content/practice/' + practice.id">
          <q-item-label>
            <div class="text-primary text-center">{{practice.feedpost.title}}</div>
          </q-item-label>
        </q-item>
      </q-list>
      <q-list class="no-border">
        <div class="text-center"><q-icon size="sm" name="fas fa-video"/>
          <p>Videos</p>
        </div>
        <q-item key="videos" to="/videos">
          <q-item-label>
            <div class="text-primary text-center">Video library</div>
          </q-item-label>
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
      ready: false,
      message: null
    }
  },
  mounted () {
    if (this.$store.state.societyid) {
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
      this.$axios.get(process.env.API + '/feedlibrary/' + this.$store.state.societyid)
        .then(response => {
          this.practices = response.data.practice
          this.groups = response.data.groups
          this.media = response.data.media
          this.songs = response.data.songs
          this.videos = response.data.videos
          this.ready = true
        })
        .catch(error => {
          if (error.code === 'ECONNABORTED') {
            this.$q.notify('Server connection timed out - are you offline?')
          } else {
            console.log(error)
          }
        })
    } else {
      this.message = 'Once you verify your phone number and tell us which church you belong to, we can check if there are any resources available to you.'
    }
  }
}
</script>

<style>
.q-item {
  min-height: 0px;
}
</style>
