<template>
  <div v-if="settings" class="q-ma-md">
    <div class="caption text-center q-mt-md">
      <div v-if="!phoneverified">
        <q-btn color="secondary" to="phoneverification">Please verify your phone number</q-btn>
        <q-btn class="q-ml-sm" label="Why?" color="primary" @click="persistent = true" />
        <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-primary text-white">
            <q-card-section>
              You don't have to verify your number, but if you do, you'll be able to:<br><br>
              <li>update your contact details,</li>
              <li>sign up for events*,</li>
              <li>view profile pictures of members of your congregation*</li>
              <li>receive reminders when you are on duty or preaching on a Sunday*, and</li>
              <li>view your personal giving records.*</li>
              <li>In addition, you can subscribe to additional blogs / sermon podcasts</li><br>
              <small>*these features assume that someone in your church is set up as an administrator using the ChurchNet system.</small>
            </q-card-section>
            <q-card-actions align="center" class="bg-white text-teal">
              <q-btn flat label="OK" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <p v-if="permission === 'denied'">Notifications are disabled. Click <router-link to="settings">HERE</router-link> to fix this</p>
      <div v-else-if="anon && phoneverified">
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
      <div v-if="$store.getters.getMenu('devotional')" class="col-6 text-center q-mb-md">
        <router-link :to="this.$store.state.feeditems.devotional.length > 1 ? '/devotionals' : '/devotional/0'" class="text-white" style="text-decoration:none;">
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
      <div v-if="$store.getters.getMenu('diary') && $store.state.feeditems.diary.length" class="col-6 text-center q-mb-md">
        <div class="q-mb-sm caption">Calendar <q-btn size="sm" color="secondary" round>{{$store.state.feeditems.diary.length}}</q-btn></div>
        <router-link to="/diary" class="text-white" style="text-decoration:none;">
          <q-icon class="text-primary" name="fas fa-fw fa-calendar-alt" size="3rem" />
        </router-link>
      </div>
      <div v-if="$store.getters.getMenu('blog')" class="col-6 text-center q-mb-md">
        <router-link :to="this.$store.state.feeditems.blog.length > 1 ? '/blogs' : '/blogposts/0'" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Blog</div>
          <q-icon class="text-primary" name="fas fa-fw fa-edit" size="3rem" />
        </router-link>
      </div>
      <div v-if="$store.getters.getMenu('sermon')" class="col-6 text-center q-mb-md">
        <router-link :to="this.$store.state.feeditems.sermon.length > 1 ? '/sermonsites' : '/sermon/0'" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Sermon</div>
          <q-icon class="text-primary" name="fas fa-fw fa-microphone" size="3rem" />
        </router-link>
      </div>
      <div v-if="$store.getters.getMenu('media')" class="col-6 text-center q-mb-md">
        <router-link to="/content/media" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Media / articles</div>
          <q-icon class="text-primary" name="fas fa-fw fa-images" size="3rem" />
        </router-link>
      </div>
      <div v-if="$store.getters.getMenu('groups')" class="col-6 text-center q-mb-md">
        <router-link to="/content/groups" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Small groups</div>
          <q-icon class="text-primary" name="fas fa-fw fa-users" size="3rem" />
        </router-link>
      </div>
      <div v-if="$store.getters.getMenu('practice')" class="col-6 text-center q-mb-md">
        <router-link to="/content/practice" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Practical exercise</div>
          <q-icon class="text-primary" name="fas fa-fw fa-praying-hands" size="3rem" />
        </router-link>
      </div>
      <div v-if="$store.getters.getMenu('reminders') && $store.state.feeditems.reminders.length" class="col-6 text-center q-mb-md">
        <router-link to="/reminders" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Inbox <q-btn size="sm" color="secondary" round>{{$store.state.feeditems.reminders.length}}</q-btn></div>
          <q-icon class="text-primary" name="fas fa-fw fa-inbox" size="3rem" />
        </router-link>
      </div>
      <div v-if="$store.getters.getMenu('events') && $store.state.feeditems.events.length" class="col-6 text-center q-mb-md">
        <router-link to="/events" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Event sign-up <q-btn size="sm" color="secondary" round>{{$store.state.feeditems.events.length}}</q-btn></div>
          <q-icon class="text-primary" name="fas fa-fw fa-clipboard" size="3rem" />
        </router-link>
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
      anon: false,
      persistent: false
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
    if (!this.$store.state.individual && !this.$store.state.individual.id) {
      if (localStorage.getItem('JOURNEY_Individual')) {
        this.$store.commit('setIndividual', JSON.parse(localStorage.getItem('JOURNEY_Individual')))
      } else {
        this.anon = true
      }
    }
  }
}
</script>

<style>
</style>
