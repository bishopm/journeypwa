<template>
  <div>
    <p class="bg-secondary text-white q-ma-md q-pa-sm header text-center">Choose a bible reading plan</p>
    <q-list v-if="readingplans.length">
      <q-item v-for="readingplan in readingplans" :key="readingplan.id" tag="label" v-ripple @click="updateplan(readingplan.id)">
        <q-item-section avatar>
          <q-radio v-model="plan" :val="readingplan.id" color="black" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{readingplan.title}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      readingplans: '',
      plan: this.$q.localStorage.getItem('JOURNEY_Readingplan')
    }
  },
  methods: {
    updateplan (id) {
      this.$q.localStorage.set('JOURNEY_Readingplan', id)
      localStorage.removeItem('JOURNEY_Readingday')
      localStorage.removeItem('JOURNEY_Readingstartday')
      this.$router.push({ name: 'dailyreading' })
    }
  },
  mounted () {
    this.$axios.get(process.env.API + '/readingplans')
      .then(response => {
        this.readingplans = response.data
      })
      .catch(error => {
        if (error.code === 'ECONNABORTED') {
          this.$q.notify('Server connection timed out - are you offline?')
        } else {
          console.log(error)
        }
      })
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
