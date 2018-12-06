<template>
  <div v-if="settings" class="layout-padding">
    <div class="caption text-center q-mt-md">
      <q-btn v-if="!phoneverified" color="secondary" to="phoneverification">Please verify your phone number</q-btn>
      <div  v-else-if="!indivset">
        Welcome, {{phoneverified}}<br>
        <q-btn to="adduser" color="secondary">Update my details</q-btn>
      </div>
    </div>
    <div class="row q-mt-lg">
      <div class="col-6 text-center q-mb-md">
        <div class="q-mb-sm caption">Sunday's readings</div>
        <router-link to="/sunday" class="text-white" style="text-decoration:none;">
          <q-icon class="text-primary" name="fas fa-fw fa-bible" size="4rem" />
        </router-link>
      </div>
      <div class="col-6 text-center q-mb-md">
        <div class="q-mb-sm caption">Faith for daily living</div>
        <router-link to="/ffdl" class="text-white" style="text-decoration:none;">
          <q-icon class="text-primary" name="fas fa-fw fa-pray" size="4rem" />
        </router-link>
      </div>
      <div v-if="menu_blogs()" class="col-6 text-center q-mb-md">
        <router-link to="/blogs" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Blog</div>
          <q-icon class="text-primary" name="fas fa-fw fa-edit" size="4rem" />
        </router-link>
      </div>
      <div v-if="menu_sermons()" class="col-6 text-center q-mb-md">
        <router-link to="/sermons" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Sermon</div>
          <q-icon class="text-primary" name="fas fa-fw fa-microphone" size="4rem" />
        </router-link>
      </div>
      <div v-if="menu_media()" class="col-6 text-center q-mb-md">
        <router-link to="/content/media" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Media / articles</div>
          <q-icon class="text-primary" name="fas fa-fw fa-images" size="4rem" />
        </router-link>
      </div>
      <div v-if="menu_groups()" class="col-6 text-center q-mb-md">
        <router-link to="/content/groups" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Small groups</div>
          <q-icon class="text-primary" name="fas fa-fw fa-users" size="4rem" />
        </router-link>
      </div>
      <div v-if="menu_practice()" class="col-6 text-center q-mb-md">
        <router-link to="/content/practice" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Practical exercise</div>
          <q-icon class="text-primary" name="fas fa-fw fa-praying-hands" size="4rem" />
        </router-link>
      </div>
      <div v-if="menu_birthdays()" class="col-6 text-center q-mb-md">
        <div>Community news</div>
        <q-icon class="q-mb-sm text-primary" name="fas fa-fw fa-user-friends" size="4rem" />
      </div>
      <div class="col-6 text-center q-mb-md">
        <div class="q-mb-sm caption">Resources library</div>
        <router-link to="/library" class="text-white" style="text-decoration:none;">
          <q-icon class="text-primary" name="fas fa-fw fa-warehouse" size="4rem" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phoneverified: localStorage.getItem('JOURNEY_VerifiedPhone'),
      params: this.$route.params
    }
  },
  computed: {
    settings () {
      if (localStorage.getItem('JOURNEY_Society')) {
        return true
      } else {
        return false
      }
    }
  },
  async mounted () {
    if (!localStorage.getItem('JOURNEY_Society')) {
      this.$router.push({ name: 'settings' })
    }
  },
  methods: {
    indivset () {
      if (this.$store.state.individual) {
        return true
      }
    },
    menu_media () {
      return this.$store.state.menu_media
    },
    menu_groups () {
      return this.$store.state.menu_groups
    },
    menu_birthdays () {
      return this.$store.state.menu_birthdays
    },
    menu_practice () {
      return this.$store.state.menu_practice
    },
    menu_blogs () {
      return this.$store.state.menu_blogs
    },
    menu_sermons () {
      return this.$store.state.menu_sermons
    }
  }
}
</script>

<style>
</style>
