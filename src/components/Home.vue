<template>
  <div v-if="settings" class="q-ma-md">
    <div class="caption text-center q-mt-md">
      <q-btn v-if="!phoneverified" color="secondary" to="phoneverification">Please verify your phone number</q-btn>
      <p v-if="permission === 'denied'">Notifications are disabled. Click <router-link to="settings">HERE</router-link> to fix this</p>
      <div v-else-if="anon">
        Welcome, {{phoneverified}}<br>
        <q-btn to="adduser" color="secondary">Update my details</q-btn>
      </div>
    </div>
    <div class="row q-mt-lg">
      <div class="col-6 text-center q-mb-md">
        <div class="q-mb-sm caption">Sunday's readings</div>
        <router-link to="/sunday" class="text-white" style="text-decoration:none;">
          <q-icon class="text-primary" name="fas fa-fw fa-bible" size="3rem" />
        </router-link>
      </div>
      <div v-if="menu_devotional()" class="col-6 text-center q-mb-md">
        <router-link :to="this.$store.state.feeditems.devotion.length > 1 ? '/devotionals' : '/devotional/0'" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Devotional</div>
          <q-icon class="text-primary" name="fas fa-fw fa-pray" size="3rem" />
        </router-link>
      </div>
      <div class="col-6 text-center q-mb-md">
        <div class="q-mb-sm caption">Resources library</div>
        <router-link to="/library" class="text-white" style="text-decoration:none;">
          <q-icon class="text-primary" name="fas fa-fw fa-warehouse" size="3rem" />
        </router-link>
      </div>
      <div v-if="menu_diary()" class="col-6 text-center q-mb-md">
        <div class="q-mb-sm caption">Calendar <q-btn size="sm" color="secondary" round>{{$store.state.feeditems.diarycount}}</q-btn></div>
        <router-link to="/diary" class="text-white" style="text-decoration:none;">
          <q-icon class="text-primary" name="fas fa-fw fa-calendar-alt" size="3rem" />
        </router-link>
      </div>
      <div v-if="menu_blogs()" class="col-6 text-center q-mb-md">
        <router-link :to="this.$store.state.feeditems.blog.length > 1 ? '/blogs' : '/blogposts/0'" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Blog</div>
          <q-icon class="text-primary" name="fas fa-fw fa-edit" size="3rem" />
        </router-link>
      </div>
      <div v-if="menu_sermons()" class="col-6 text-center q-mb-md">
        <router-link :to="this.$store.state.feeditems.sermon.length > 1 ? '/sermonsites' : '/sermon/0'" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Sermon</div>
          <q-icon class="text-primary" name="fas fa-fw fa-microphone" size="3rem" />
        </router-link>
      </div>
      <div v-if="menu_media()" class="col-6 text-center q-mb-md">
        <router-link to="/content/media" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Media / articles</div>
          <q-icon class="text-primary" name="fas fa-fw fa-images" size="3rem" />
        </router-link>
      </div>
      <div v-if="menu_groups()" class="col-6 text-center q-mb-md">
        <router-link to="/content/groups" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Small groups</div>
          <q-icon class="text-primary" name="fas fa-fw fa-users" size="3rem" />
        </router-link>
      </div>
      <div v-if="menu_practice()" class="col-6 text-center q-mb-md">
        <router-link to="/content/practice" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Practical exercise</div>
          <q-icon class="text-primary" name="fas fa-fw fa-praying-hands" size="3rem" />
        </router-link>
      </div>
      <div v-if="menu_reminders()" class="col-6 text-center q-mb-md">
        <router-link to="/reminders" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Inbox <q-btn size="sm" color="secondary" round>{{$store.state.feeditems.reminders.length}}</q-btn></div>
          <q-icon class="text-primary" name="fas fa-fw fa-inbox" size="3rem" />
        </router-link>
      </div>
      <div v-if="menu_events()" class="col-6 text-center q-mb-md">
        <router-link to="/events" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Event sign-up <q-btn size="sm" color="secondary" round>{{$store.state.feeditems.events.length}}</q-btn></div>
          <q-icon class="text-primary" name="fas fa-fw fa-clipboard" size="3rem" />
        </router-link>
      </div>
      <div v-if="menu_birthdays()" class="col-6 text-center q-mb-md">
        <div>Community news</div>
        <q-icon class="q-mb-sm text-primary" name="fas fa-fw fa-user-friends" size="3rem" />
      </div>
    </div>
  </div>
</template>

<script>
import 'assets/push-notifications.js'
export default {
  data () {
    return {
      phoneverified: localStorage.getItem('JOURNEY_VerifiedPhone'),
      grace: false,
      anon: false
    }
  },
  computed: {
    settings () {
      if (localStorage.getItem('JOURNEY_Society')) {
        return true
      } else {
        return false
      }
    },
    permission () {
      return Notification.permission
    }
  },
  async mounted () {
    if (!localStorage.getItem('JOURNEY_Society')) {
      this.$router.push({ name: 'settings' })
    }
    if (!this.$store.state.individual.household) {
      this.$store.commit('setIndividual', JSON.parse(localStorage.getItem('JOURNEY_Individual')))
      if (!this.$store.state.individual.firstname) {
        this.anon = true
      }
    }
  },
  methods: {
    menu_devotional () {
      return this.$store.state.menu_devotional
    },
    menu_diary () {
      return this.$store.state.menu_diary
    },
    menu_events () {
      return this.$store.state.menu_events
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
    },
    menu_reminders () {
      return this.$store.state.menu_reminders
    }
  }
}
</script>

<style>
</style>
