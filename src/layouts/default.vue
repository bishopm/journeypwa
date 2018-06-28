<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          <router-link to="/" class="text-white" style="text-decoration:none;">Journey</router-link>
          <div slot="subtitle">together on the way</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <q-list no-border link inset-delimiter>
        <q-list-header class="text-center"><b>{{societyname()}} Society</b></q-list-header>
        <q-item to="/">
          <q-item-side icon="book" />
          <q-item-main label="Sunday" sublabel="Lectionary readings for Sunday" />
        </q-item>
        <q-item v-if="menu_birthdays()" to="/community">
          <q-item-side icon="people_outline" />
          <q-item-main label="Community" sublabel="Birthdays, prayer needs" />
        </q-item>
        <q-item v-if="menu_media()" to="/extra">
          <q-item-side icon="chrome_reader_mode" />
          <q-item-main label="Extra" sublabel="Media / articles" />
        </q-item>
        <q-item v-if="menu_groups()" to="/groups">
          <q-item-side icon="group" />
          <q-item-main label="Groups" sublabel="Small group material" />
        </q-item>
        <q-item to="/ffdl">
          <q-item-side icon="book" />
          <q-item-main label="Devotions" sublabel="Faith for daily living" />
        </q-item>
        <q-list-header class="text-center"><b>{{circuitname() || 'Circuit'}}</b></q-list-header>
        <q-item to="/societies">
          <q-item-side icon="people" />
          <q-item-main label="Societies" sublabel="My circuit" />
        </q-item>
        <q-item to="/diary">
          <q-item-side icon="calendar_today" />
          <q-item-main label="Circuit diary" sublabel="Upcoming circuit meetings and events" />
        </q-item>
        <q-list-header class="text-center"><b>App administration</b></q-list-header>
        <q-item to="/settings">
          <q-item-side icon="settings" />
          <q-item-main label="Settings" sublabel="App settings" />
        </q-item>

      </q-list>
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-layout-footer>
      <q-toolbar>
        <q-item>
          <router-link :to="{ name: 'home' }"><q-item-side style="text-decoration:none;" icon="home" color="white"/></router-link>
        </q-item>
        <q-item to="/societies">
          <q-item-side icon="group" color="white"/>
        </q-item>
        <q-item to="/sunday">
          <q-item-side icon="book" color="white"/>
        </q-item>
        <q-item to="/lectionary">
          <q-item-side icon="library_books" color="white"/>
        </q-item>
        <q-item to="/settings">
          <q-item-side icon="settings" color="white"/>
        </q-item>
      </q-toolbar>
    </q-layout-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    menu_media () {
      return this.$store.state.menu_media
    },
    menu_groups () {
      return this.$store.state.menu_groups
    },
    menu_birthdays () {
      return this.$store.state.menu_birthdays
    },
    societyname () {
      return this.$store.state.societyname
    },
    circuitname () {
      return this.$store.state.circuitname
    }
  }
}
</script>

<style>
a, a:hover {
  text-decoration: none;
}
</style>
