<template>
  <div>
    <q-list v-if="lections" class="no-border">
      <p class="q-my-md q-mx-md header text-center bg-secondary q-pa-sm text-white text-bold">Revised Common Lectionary: Year {{lections[0].lection.year}}</p>
      <q-item v-for="(lection, index) in lections" :key="lection.date" :to="'/otherday/' + lection.date" :class="{striped: index % 2 === 1}">
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
        'cacheKey': 'JOURNEY_Lectionary'
      }
    }
  },
  mounted () {
    this.$axios.get(process.env.API + '/lectionary')
      .then(response => {
        this.lections = response.data
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
.q-item.striped {
  background-color:#fafafa;
  margin-left:20px;
  margin-right:20px;
}
.q-item {
  min-height: 36px;
  margin-left:20px;
  margin-right:20px;
}
</style>
