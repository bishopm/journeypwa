<template>
  <div class="q-ma-md">
    <p class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">Material published by other churches this week</p>
    <div v-if="others">
      <div v-for="(other, category) in others" :key="category">
        <q-expansion-item class="text-center text-captalize" :label="category">
          <q-item v-for="item in other" :key="item.id" :to="'/published/' + item.id">
            <q-item-section class="text-left">
              <q-item-label>{{item.title}}</q-item-label>
              <q-item-label caption>{{item.source}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      others: []
    }
  },
  mounted () {
    this.others = this.$store.state.feeditems.others
  }
}
</script>

<style>
</style>
