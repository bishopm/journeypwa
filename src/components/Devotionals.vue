<template>
  <div class="q-mt-xs q-ma-md" v-if="devotionals.length">
    <p class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">Devotional readings</p>
    <q-list>
      <q-item v-for="(devotional, index) in devotionals" :key="devotional.permalink" :to="'/devotional/' + index">
        <q-item-section class="text-center">
          {{devotional.title}}
        </q-item-section>
        <q-item-section avatar>
          <q-chip>{{devotional.items.length}}</q-chip>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      devotionals: []
    }
  },
  mounted () {
    if (!this.$store.state.feeditems) {
      this.$router.push({ name: 'home' })
    }
    this.devotionals = this.$store.state.feeditems.devotional
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
img {
  display: none;
}
</style>
