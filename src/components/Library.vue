<template>
  <div class="q-mt-xs q-ma-md">
    <p class="text-center caption">Resource library<br>
      <small v-if="practices || media || groups">Click on an item to open</small>
      <small v-else>No items have been added to the library yet</small>
    </p>
    <div v-if="ready">
      <q-list v-if="practices" class="no-border">
        <div class="text-center"><q-icon size="sm" name="fas fa-pray"/>
          <p>Practices</p>
        </div>
        <q-item v-for="(practice, index) in practices" :key="practice.id" :to="'/content/practice/' + practice.id"  :class="{striped: index % 2 === 1}">
          <q-item-label>
            <div style="color:#4d7227" class="text-center">{{practice.feedpost.title}}</div>
          </q-item-label>
        </q-item>
      </q-list>
      <q-list class="no-border" v-if="media">
        <div class="text-center"><q-icon size="sm" name="fas fa-images"/>
          <p>Media</p>
        </div>
        <q-item v-for="medi in media" :key="medi.id" :to="'/content/media/' + medi.id">
          <q-item-label>
            <div style="color:#4d7227" class="text-center">{{medi.feedpost.title}}</div>
          </q-item-label>
        </q-item>
      </q-list>
      <q-list class="no-border" v-if="groups">
        <div class="text-center"><q-icon size="sm" name="fas fa-users"/>
          <p>Groups</p>
        </div>
        <q-item v-for="group in groups" :key="group.id" :to="'/content/groups/' + group.id">
          <q-item-label>
            <div style="color:#4d7227" class="text-center">{{group.feedpost.title}}</div>
          </q-item-label>
        </q-item>
      </q-list>
      <q-list class="no-border" v-if="songs">
        <div class="text-center"><q-icon size="sm" name="fas fa-music"/>
          <p><router-link style="color:#4d7227" to="hymnbook">Hymns, songs & liturgy</router-link>
            <q-chip color="tertiary" class="q-ml-md">{{songs}}</q-chip>
          </p>
        </div>
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
    } else {
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
      this.$axios.get(process.env.API + '/feedlibrary/' + this.$store.state.societyid)
        .then(response => {
          this.practices = response.data.practice
          this.groups = response.data.groups
          this.media = response.data.media
          this.songs = response.data.songs
          this.ready = true
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.q-item.striped {
  background-color:#E6f2d9;
}
.q-item {
  margin-left:20px;
  margin-right:20px;
  min-height: 0px;
}
</style>
