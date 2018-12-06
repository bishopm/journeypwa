<template>
  <div class="q-mt-xs layout-padding">
    <q-list v-if="practices" class="no-border">
      <div class="text-center"><q-icon size="sm" name="fas fa-pray"/>
        <p>Practices</p>
      </div>
      <q-item v-for="practice in practices" :key="practice.id" :to="'/content/practice/' + practice.id">
        <q-item-main>
          {{practice.feedpost.title}}
        </q-item-main>
      </q-item>
    </q-list>
    <q-list class="no-border" v-if="media">
      <div class="text-center"><q-icon size="sm" name="fas fa-images"/>
        <p>Media</p>
      </div>
      <q-item v-for="medi in media" :key="medi.id" :to="'/content/media/' + medi.id">
        <q-item-main>
          {{medi.feedpost.title}}
        </q-item-main>
      </q-item>
    </q-list>
    <q-list class="no-border" v-if="groups">
      <div class="text-center"><q-icon size="sm" name="fas fa-users"/>
        <p>Groups</p>
      </div>
      <q-item v-for="group in groups" :key="group.id" :to="'/content/groups/' + group.id">
        <q-item-main>
          {{group.feedpost.title}}
        </q-item-main>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      practices: [],
      groups: [],
      media: []
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
      })
      .catch(function (error) {
        console.log(error)
      })
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
