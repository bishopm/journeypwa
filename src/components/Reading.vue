<template>
  <div class="text-center" v-if="readings.length">
    <q-tabs v-model="selectedTab" active-color="white" indicator-color="primary" class="no-border bg-secondary text-primary" q-tabs-two-lines>
      <q-tab v-for="readingHeader in readingHeaders" :name="readingHeader" :key="readingHeader">{{cleanup(readingHeader)}}</q-tab>
    </q-tabs>
    <q-tab-panels v-model="selectedTab" animated class="q-ma-sm">
      <q-tab-panel v-for="reading in readings" :key="reading.title" :name="reading.title" class="no-border">
        <div v-for="section in reading.reading" :key="section['reading']" class="text-justify">
          <div class="q-my-md" v-if="section['type']=='optional'"><b>Optional verses</b>
            <i><div v-html="section['text']"></div></i>
          </div>
          <div v-else class="q-my-md" v-html="section['text']"></div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
    <small><div class="text-justify q-ma-md" v-html="readings[0].reading[0].copyright"></div></small>
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
    this.$q.loading.show({
      message: 'Retrieving Bible reading',
      messageColor: 'white',
      spinnerSize: 250, // in pixels
      spinnerColor: 'white'
    })
    if (this.$q.localStorage.getItem('JOURNEY_Bible')) {
      this.bible = this.$q.localStorage.getItem('JOURNEY_Bible')
    } else {
      this.bible = 'eng-GNTUK'
    }
    this.$axios.get(process.env.API + '/reading/' + this.$route.params.reading + '/' + this.bible)
      .then((response) => {
        for (var value in response.data) {
          this.readingHeaders.push(value)
          this.readings.push({ title: value, reading: response.data[value] })
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
.q-tabs {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
</style>
