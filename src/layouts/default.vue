<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-toolbar-title>
          <router-link to="/" class="text-white" style="text-decoration:none;"><q-icon size="1.2rem" class="q-mb-xs" name="home" color="white"/> Journey</router-link>
          <div class="q-ml-xs" slot="subtitle">together on the way</div>
        </q-toolbar-title>
        <q-btn flat dense round @click="rightDrawerOpen = !rightDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer side="right" v-model="rightDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <q-list no-border link inset-delimiter>
        <q-collapsible opened class="text-center text-primary" group="somegroup" :label="societyname() + ' Society'">
          <q-item v-if="messages()" to="/messages">
            <q-item-side icon="message" />
            <q-item-main :label="'Messages: ' + messages()" sublabel="Inbox messages" />
          </q-item>
          <q-item v-if="menu_community()" to="/community">
            <q-item-side icon="people_outline" />
            <q-item-main label="Community" sublabel="Community news and needs" />
          </q-item>
          <q-item to="/ffdl">
            <q-item-side icon="book" />
            <q-item-main label="Devotions" sublabel="Faith for daily living" />
          </q-item>
          <q-item v-if="menu_blogs()" to="/blogs">
            <q-item-side icon="create" />
            <q-item-main label="Blog" sublabel="From our blog" />
          </q-item>
          <q-item v-if="menu_sermons()" to="/sermons">
            <q-item-side icon="mic" />
            <q-item-main label="Sermon" sublabel="Last week's sermon" />
          </q-item>
          <q-item v-if="menu_groups()" to="/content/groups">
            <q-item-side icon="group" />
            <q-item-main label="Groups" sublabel="Small group material" />
          </q-item>
          <q-item v-if="menu_media()" to="/content/media">
            <q-item-side icon="art_track" />
            <q-item-main label="Extra" sublabel="Media / articles" />
          </q-item>
          <q-item v-if="menu_practice()" to="/content/practice">
            <q-item-side icon="pan_tool" />
            <q-item-main label="Practice" sublabel="Practice or discipline for the week" />
          </q-item>
          <q-item to="/sunday">
            <q-item-side icon="book" />
            <q-item-main label="Sunday" sublabel="Lectionary readings for Sunday" />
          </q-item>
        </q-collapsible>
        <q-collapsible class="text-center text-primary" group="somegroup" :label="circuitname() || 'Circuit'">
          <q-item to="/societies">
            <q-item-side icon="people" />
            <q-item-main label="Societies" sublabel="My circuit" />
          </q-item>
          <q-item to="/diary">
            <q-item-side icon="calendar_today" />
            <q-item-main label="Circuit diary" sublabel="Upcoming circuit meetings and events" />
          </q-item>
        </q-collapsible>
        <q-collapsible class="text-center text-primary" group="somegroup" label="App administration">
          <q-item to="/settings">
            <q-item-side icon="settings" />
            <q-item-main label="Settings" sublabel="App settings" />
          </q-item>
          <q-item to="/me">
            <q-item-side icon="person_pin" />
            <q-item-main label="My details" sublabel="My personal and household details" />
          </q-item>
        </q-collapsible>
      </q-list>
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data () {
    return {
      rightDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    menu_media () {
      return this.$store.state.menu_media
    },
    menu_groups () {
      return this.$store.state.menu_groups
    },
    menu_community () {
      return this.$store.state.menu_community
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
    societyname () {
      return this.$store.state.societyname
    },
    circuitname () {
      return this.$store.state.circuitname
    },
    messages () {
      return this.$store.state.chats.length
    }
  }
}
</script>

<style>
a, a:hover {
  text-decoration: none;
}
#q-app > div > div.q-drawer-container > aside > div > div.q-collapsible.q-item-division.relative-position.text-center.text-primary.q-collapsible-cursor-pointer > div > div.q-item.q-item-division.relative-position {
  background-color:#4d7227;
  border-bottom:white solid 2px;
  color: white;
  text-align:center;
}
#toolbar {
  display: flex;
  justify-content: space-between;
}
</style>
