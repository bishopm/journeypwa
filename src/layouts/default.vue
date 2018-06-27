<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          Journey
          <div slot="subtitle">together on the way</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <q-list no-border link inset-delimiter>
        <q-list-header>Umhlali Methodist Church</q-list-header>
        <q-item to="/">
          <q-item-side icon="book" />
          <q-item-main label="Sunday" sublabel="Lectionary readings for Sunday" />
        </q-item>
        <q-item to="/community">
          <q-item-side icon="people_outline" />
          <q-item-main label="Community" sublabel="Birthdays, prayer needs" />
        </q-item>
        <q-item to="/extra">
          <q-item-side icon="chrome_reader_mode" />
          <q-item-main label="Extra" sublabel="Media / articles" />
        </q-item>
        <q-item to="/groups">
          <q-item-side icon="group" />
          <q-item-main label="Groups" sublabel="Small group material" />
        </q-item>
        <q-item to="/settings">
          <q-item-side icon="settings" />
          <q-item-main label="Settings" sublabel="App settings" />
        </q-item>
        <q-list-header>Lower Tugela Circuit</q-list-header>
        <q-item to="/societies">
          <q-item-side icon="people" />
          <q-item-main label="Societies" sublabel="My circuit" />
        </q-item>
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
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  }
}
</script>

<style>
</style>
