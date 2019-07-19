<template>
  <div class="q-ma-md">
    <div class="row q-mt-lg">
      <div class="col-6 text-center q-mb-md">
        <div class="q-mb-sm caption">Sunday's readings</div>
        <router-link to="/sunday" class="text-white" style="text-decoration:none;">
          <q-icon class="text-primary" name="fas fa-fw fa-bible" size="3rem" />
        </router-link>
      </div>
      <div class="col-6 text-center q-mb-md">
        <div class="q-mb-sm caption">Resources library</div>
        <router-link to="/library" class="text-white" style="text-decoration:none;">
          <q-icon class="text-primary" name="fas fa-fw fa-warehouse" size="3rem" />
        </router-link>
      </div>
      <div class="col-6 text-center q-mb-md">
        <div class="q-mb-sm caption">Bible reading plan</div>
        <router-link to="/dailyreading" class="text-white" style="text-decoration:none;">
          <q-icon class="text-primary" name="fas fa-fw fa-book-open" size="3rem" />
        </router-link>
      </div>
      <div class="col-6 text-center q-mb-md">
        <div class="q-mb-sm caption">From other churches</div>
        <router-link to="/published" class="text-white" style="text-decoration:none;">
          <q-icon class="text-primary" name="fas fa-fw fa-share-alt" size="3rem" />
        </router-link>
      </div>
      <div v-if="$store.getters.getMenu('children')" class="col-6 text-center q-mb-md">
        <router-link to="/content/children" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Children</div>
          <q-icon class="text-primary" name="fas fa-fw fa-child" size="3rem" />
        </router-link>
      </div>
      <div v-if="$store.getters.getMenu('devotional')" class="col-6 text-center q-mb-md">
        <router-link :to="this.$store.state.feeditems.devotional.length > 1 ? '/devotionals' : '/devotional/0'" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Devotional</div>
          <q-icon class="text-primary" name="fas fa-fw fa-pray" size="3rem" />
        </router-link>
      </div>
      <div v-if="$store.getters.getMenu('diary') && $store.state.feeditems.diary.length" class="col-6 text-center q-mb-md">
        <router-link to="/diary" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm caption text-black">Calendar</div>
          <q-icon class="text-primary" name="fas fa-fw fa-calendar-alt" size="3rem" />
          <q-btn style="vertical-align:top" color="secondary" size="xs" class="text-black" round>{{$store.state.feeditems.diary.length}}</q-btn>
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
          <div class="q-mb-sm text-black caption">Inbox</div>
          <q-icon class="text-primary" name="fas fa-fw fa-inbox" size="3rem" />
          <q-btn style="vertical-align:top" size="xs" color="secondary" round>{{$store.state.feeditems.reminders.length}}</q-btn>
        </router-link>
      </div>
      <div v-if="$store.getters.getMenu('events') && $store.state.feeditems.events.length" class="col-6 text-center q-mb-md">
        <router-link to="/events" class="text-white" style="text-decoration:none;">
          <div class="q-mb-sm text-black caption">Event sign-up</div>
          <q-icon class="text-primary" name="fas fa-fw fa-clipboard" size="3rem" />
          <q-btn style="vertical-align:top" size="xs" color="secondary" round>{{$store.state.feeditems.events.length}}</q-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.q-select__input--padding {
  padding-left: 0px;
}
</style>
