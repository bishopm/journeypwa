<template>
  <div>
    <q-list striped v-if="today" class="no-border">
      <p class="bg-secondary text-white q-ma-md q-pa-sm header text-center">{{$store.state.feeditems.dailyreading.readingplan.title}} {{today}} [Day {{this.$store.state.feeditems.dailyreading.readingday}}]</p>
      <q-item v-for="(reading, index) in readings" :key="reading" :to="'/reading/' + encodeURI(reading)" :class="{striped: index % 2 === 1}">
        <q-item-section class="text-center">
          <q-item-label v-html="cleanup(reading)"/>
        </q-item-section>
      </q-item>
    </q-list>
    <p class="q-ma-md text-italic text-justify">{{$store.state.feeditems.dailyreading.readingplan.description}}</p>
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
    this.readings = this.$store.state.feeditems.dailyreading.readings.split(';')
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
