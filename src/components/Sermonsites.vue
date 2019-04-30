<template>
  <div class="q-mt-xs q-ma-md" v-if="sermonsites.length">
    <p class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">Sermons</p>
    <q-list>
      <q-item v-for="(site, index) in sermonsites" :key="site.permalink" :to="'/sermon/' + index">
        <q-item-section class="text-center">
          {{site.title}}
        </q-item-section>
        <q-item-section avatar>
          <q-chip>{{site.items.length}}</q-chip>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sermonsites: []
    }
  },
  mounted () {
    if (!this.$store.state.feeditems) {
      this.$router.push({ name: 'home' })
    }
    this.sermonsites = this.$store.state.feeditems.sermon
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
