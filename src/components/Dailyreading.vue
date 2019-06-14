<template>
  <div>
    <q-list striped v-if="readings.length" class="no-border">
      <p class="bg-secondary text-white q-ma-md q-pa-sm header text-center">{{readingplan.title}} [Day {{readingday}}]</p>
      <p class="text-center">
        <small>You started this reading plan on {{$q.localStorage.getItem('JOURNEY_Readingstartday')}}</small>
      </p>
      <q-item v-for="(reading, index) in readings" :key="reading" :to="'/reading/' + encodeURI(reading)" :class="{striped: index % 2 === 1}">
        <q-item-section class="text-center">
          <q-item-label v-html="cleanup(reading)"/>
        </q-item-section>
      </q-item>
    </q-list>
    <p class="q-ma-md text-italic text-justify">{{readingplan.description}}</p>
    <div class="text-center">
      <q-btn class="q-ma-md" @click="daydone" color="primary">Click when you're finished the day's reading/s</q-btn><br><q-btn to="/readingplans">View all reading plans</q-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      today: '',
      readings: [],
      readingday: 0,
      readingplan: {}
    }
  },
  methods: {
    cleanup (textin) {
      return textin.replace(/\[/g, ' [').replace(/,/g, ', ').replace(' or ', '<br>or<br>')
    },
    daydone () {
      this.$q.localStorage.set('JOURNEY_Readingday', this.readingday + 1)
      this.getreadings()
      this.$q.notify('Well done! See you tomorrow :)')
      this.$router.push({ name: 'home' })
    },
    getreadings () {
      if (!this.$q.localStorage.getItem('JOURNEY_Readingday')) {
        this.readingday = 1
        this.$q.localStorage.set('JOURNEY_Readingstartday', this.today)
        this.$q.localStorage.set('JOURNEY_Readingday', 1)
      } else {
        this.readingday = this.$q.localStorage.getItem('JOURNEY_Readingday')
      }
      this.$axios.get(process.env.API + '/dailyreading/' + this.$q.localStorage.getItem('JOURNEY_Readingplan') + '/' + this.readingday)
        .then(response => {
          this.readings = response.data.readings.split(';')
          this.readingplan = response.data.readingplan
        })
        .catch(error => {
          if (error.code === 'ECONNABORTED') {
            this.$q.notify('Server connection timed out - are you offline?')
          } else {
            console.log(error)
          }
        })
    }
  },
  mounted () {
    if (!this.$q.localStorage.getItem('JOURNEY_Readingplan')) {
      this.$router.push({ name: 'readingplans' })
    } else {
      this.today = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
      this.getreadings()
    }
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
