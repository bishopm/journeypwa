<template>
  <div>
    <q-list v-if="lections" striped class="no-border">
      <p class="q-my-md q-mx-md header text-center bg-secondary q-pa-sm text-white text-bold">Revised Common Lectionary: Year {{lections[0].lection.year}}</p>
      <q-item v-for="lection in lections" :key="lection.date" :to="'/otherday/' + lection.date">
        <q-item-section side>
          <q-item-label caption>{{lection.date}}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{lection.lection.description}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import saveState from 'vue-save-state'
export default {
  data () {
    return {
      lections: []
    }
  },
  mixins: [saveState],
  methods: {
    getSaveStateConfig () {
      return {
        'cacheKey': 'CIRC_Lectionary'
      }
    }
  },
  mounted () {
    if (!localStorage.getItem('CIRC_Lectionary')) {
      // this.$q.loading.show()
    }
    // this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.profile.token
    this.$axios.get(process.env.API + '/lectionary')
      .then(response => {
        this.lections = response.data
        // this.$q.loading.hide()
      })
      .catch(function (error) {
        console.log(error)
        // this.$q.loading.hide()
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
.q-list-striped > .q-item:nth-child(even) {
  background-color: #E6f2d9;
}
.q-item {
  min-height: 36px;
  padding-left: 15px;
}
</style>
