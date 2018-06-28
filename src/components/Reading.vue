<template>
  <div class="text-center" v-if="readings.length">
    <q-tabs v-model="selectedTab" color="black" class="no-border" q-tabs-two-lines>
      <q-tab v-for="readingHeader in readingHeaders" slot="title" :name="readingHeader" :key="readingHeader">{{cleanup(readingHeader)}}</q-tab>
      <q-tab-pane v-for="reading in readings" :key="reading.title" :name="reading.title" class="no-border">
        <div v-for="section in reading.reading" :key="section['reading']" class="text-justify">
          <div class="q-my-lg" v-if="section['type']=='optional'"><b>Optional verses</b>
            <i><div v-html="section['text']"></div></i>
          </div>
          <div v-else class="q-my-lg" v-html="section['text']"></div>
        </div>
      </q-tab-pane>
      <small><div class="text-justify layout-padding" v-html="readings[0].reading[0].copyright"></div></small>
    </q-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      readings: [],
      readingHeaders: [],
      bible: '',
      selectedTab: ''
    }
  },
  methods: {
    cleanup (textin) {
      return textin.replace(/\[/g, ' [').replace(/,/g, ', ')
    }
  },
  mounted () {
    this.$q.loading.show()
    if (localStorage.getItem('JOURNEY_Bible')) {
      this.bible = localStorage.getItem('JOURNEY_Bible')
    } else {
      this.bible = 'eng-GNTUK'
    }
    this.$axios.get(this.$store.state.hostname + '/reading/' + this.$route.params.reading + '/' + this.bible)
      .then((response) => {
        for (var value in response.data) {
          this.readingHeaders.push(value)
          this.readings.push({title: value, reading: response.data[value]})
        }
        this.selectedTab = this.readingHeaders[0]
        this.$q.loading.hide()
      })
      .catch(function (error) {
        console.log(error)
        this.$q.loading.hide()
      })
  }
}
</script>

<style>
#map {
  text-align:center;
  height: 300px;
  width: 100%;
}
.s1 {
  font-size: 110%;
  line-height: 18px;
  padding: 0;
  text-align: center;
}
.q1 {
  margin: 0;
}
h4 {
  line-height: 0px;
  font-weight:600;
}
h5.r {
  line-height: 0px;
  font-style: italic;
  font-size: 70%;
}
</style>
