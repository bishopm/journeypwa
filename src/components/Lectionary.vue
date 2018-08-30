<template>
  <div>
    <q-list v-if="lections" striped class="no-border">
      <p class="q-my-md caption text-center">Revised Common Lectionary: Year {{lections[0].lection.year}}</p>
      <q-item v-for="lection in lections" :key="lection.date" :to="'/otherday/' + lection.date">
        <q-item-side>
          {{lection.date}}
        </q-item-side>
        <q-item-main>
          {{lection.lection.description}}
        </q-item-main>
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
    this.$axios.get(this.$store.state.hostname + '/lectionary')
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
</style>
