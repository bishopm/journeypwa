<template>
  <div>
    <q-list striped v-if="today" class="no-border">
      <p class="bg-secondary text-white q-ma-md q-pa-sm header text-center">Read the bible in a year: {{today}}</p>
      <q-item :to="'/reading/' + encodeURI($store.state.feeditems.dailyreading.reading1)" class="striped">
        <q-item-section class="text-center">
          <q-item-label v-html="cleanup($store.state.feeditems.dailyreading.reading1)"/>
        </q-item-section>
      </q-item>
      <q-item :to="'/reading/' + encodeURI($store.state.feeditems.dailyreading.reading2)">
        <q-item-section class="text-center">
          <q-item-label v-html="cleanup($store.state.feeditems.dailyreading.reading2)"/>
        </q-item-section>
      </q-item>
      <q-item :to="'/reading/' + encodeURI($store.state.feeditems.dailyreading.reading3)" class="striped">
        <q-item-section class="text-center">
          <q-item-label v-html="cleanup($store.state.feeditems.dailyreading.reading3)"/>
        </q-item-section>
      </q-item>
      <q-item :to="'/reading/' + encodeURI($store.state.feeditems.dailyreading.reading4)">
        <q-item-section class="text-center">
          <q-item-label v-html="cleanup($store.state.feeditems.dailyreading.reading4)"/>
        </q-item-section>
      </q-item>
    </q-list>
    <p class="q-ma-md text-italic text-justify">This reading plan was originally devised by the 19th Century Scottish minister, Robert Murray M’Cheyne, who lived from 1813-1843. It takes readers through the New Testament and Psalms twice a year, and through the rest of the Bible once each year.</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      today: ''
    }
  },
  methods: {
    cleanup (textin) {
      return textin.replace(/\[/g, ' [').replace(/,/g, ', ').replace(' or ', '<br>or<br>')
    }
  },
  mounted () {
    this.today = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
  }
}
</script>

<style>
h4 {
  line-height: 0px;
}
p.caption {
  line-height: 12px;
}
</style>
