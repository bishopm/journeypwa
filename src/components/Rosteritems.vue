<template>
  <div class="q-mt-xs">
    <q-list striped v-if="rosteritems" no-border>
      <p class="bg-secondary text-white caption text-center q-pa-sm">Upcoming roster dates</p>
      <q-item v-for="rosteritem in rosteritems" :key="rosteritem" :class="{striped: index % 2 === 1}">
        <q-item-section class="text-justify"><span v-html="rosteritem.rosterdate"/></q-item-section>
        <q-item-section avatar class="text-right"><span v-html="rosteritem.groupname"/></q-item-section>
      </q-item>
    </q-list>
    <p v-else>You have no upcoming roster dates</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rosteritems: []
    }
  },
  mounted () {
    this.rosteritems = this.$store.state.feeditems['rosteritems']
  }
}
</script>

<style>
.q-item.striped {
  background-color:#E6f2d9;
  margin-left:20px;
  margin-right:20px;
}
</style>
